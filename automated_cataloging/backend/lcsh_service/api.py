from fastapi import HTTPException
from typing import Dict, List, Optional
import aiohttp
import asyncio
from .models import SubjectHeading, ClassificationNumber, AuthorityRecord
import json

class LOCService:
    def __init__(self):
        self.base_url = "https://www.loc.gov"
        self.session = aiohttp.ClientSession()
        self._cache = {}

    async def search_subjects(self, query: str, limit: int = 20) -> List[SubjectHeading]:
        """Search for subject headings"""
        try:
            cache_key = f"search:{query}:{limit}"
            if cache_key in self._cache:
                return self._cache[cache_key]

            async with self.session.get(
                f"{self.base_url}/search",
                params={
                    "q": query,
                    "fo": "json",
                    "c": "subjects",
                    "count": limit
                }
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    results = []
                    
                    if 'results' in data and isinstance(data['results'], list):
                        for item in data['results']:
                            # Create SubjectHeading object
                            subject = SubjectHeading(
                                id=item.get('id', ''),
                                title=item.get('title', ''),
                                uri=item.get('id', ''),
                                type=item.get('original_format', [])
                                if isinstance(item.get('original_format'), list)
                                else [item.get('original_format', '')],
                                metadata={
                                    'date': item.get('date', ''),
                                    'contributor': item.get('contributor', []),
                                    'subject': item.get('subject', []),
                                    'location': item.get('location', [])
                                }
                            )
                            results.append(subject)
                    
                    self._cache[cache_key] = results
                    return results
                else:
                    raise HTTPException(
                        status_code=response.status,
                        detail="Failed to fetch subjects"
                    )
                    
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error searching subjects: {str(e)}"
            )

    async def get_subject_suggestions(self, text: str, limit: int = 20) -> List[SubjectHeading]:
        """Get subject suggestions based on text analysis"""
        try:
            # Split text into meaningful keywords
            keywords = [word.strip() for word in text.split() 
                       if len(word.strip()) > 2]
            
            # Search using the complete text first
            results = await self.search_subjects(text, limit)
            
            # If no results, try individual keywords
            if not results:
                for keyword in keywords:
                    keyword_results = await self.search_subjects(keyword, 5)
                    results.extend(keyword_results)
            
            # Remove duplicates
            seen = set()
            unique_results = []
            for subject in results:
                if subject.id not in seen:
                    seen.add(subject.id)
                    unique_results.append(subject)
            
            return unique_results[:limit]
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error getting suggestions: {str(e)}"
            )

    async def get_subject_details(self, subject_id: str) -> SubjectHeading:
        """Get detailed information about a specific subject"""
        try:
            async with self.session.get(
                f"{self.base_url}/authorities/subjects/{subject_id}",
                params={"fo": "json"}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return SubjectHeading(
                        id=subject_id,
                        title=data.get('title', ''),
                        uri=data.get('uri', ''),
                        type=data.get('type', []),
                        broader=data.get('broader', []),
                        narrower=data.get('narrower', []),
                        related=data.get('related', []),
                        metadata=data.get('metadata', {}),
                        note=data.get('note', ''),
                        created=data.get('created', ''),
                        modified=data.get('modified', ''),
                        variants=data.get('variants', [])
                    )
                else:
                    raise HTTPException(
                        status_code=response.status,
                        detail="Subject not found"
                    )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error getting subject details: {str(e)}"
            )

    async def close(self):
        if self.session:
            await self.session.close()
