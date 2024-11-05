from fastapi import FastAPI, File, UploadFile, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from lcsh_service.api import LOCService
from lcsh_service.ai.image_analyzer import ImageAnalyzer
from lcsh_service.models import SubjectHeading, ImageAnalysisResult, AuthorityRecord
from typing import List, Dict, Optional
import json

app = FastAPI(
    title="Enhanced LOC API Service",
    description="Library of Congress Authority Service with AI Integration",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
loc_service = LOCService()
image_analyzer = ImageAnalyzer()

@app.get("/")
async def root():
    """Root endpoint with service information"""
    return {
        "message": "LOC Authority Service API",
        "version": "1.0.0",
        "available_authorities": [
            "LCSH (Subject Headings)",
            "LCNAF (Name Authority)",
            "LCGFT (Genre/Form Terms)",
            "Children's Subject Headings",
            "Demographic Terms",
            "Geographic Areas",
            "Medium of Performance"
        ]
    }

@app.get("/api/subjects/search/", response_model=List[SubjectHeading])
async def search_subjects(
    q: str = Query(..., min_length=2),
    limit: int = Query(20, ge=1, le=100),
    authority_type: Optional[str] = None
):
    """
    Search for subject headings with enhanced metadata
    
    Parameters:
    - q: Search query
    - limit: Maximum number of results
    - authority_type: Specific authority to search (optional)
    """
    try:
        results = await loc_service.search_subjects(q, limit)
        
        # Filter by authority type if specified
        if authority_type:
            results = [r for r in results if authority_type in r.type]
            
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )

@app.get("/api/subjects/{subject_id}", response_model=SubjectHeading)
async def get_subject_details(subject_id: str):
    """
    Get detailed information about a specific subject heading
    Including MARC fields and cross-references
    """
    try:
        details = await loc_service.get_subject_details(subject_id)
        if not details:
            raise HTTPException(status_code=404, detail="Subject not found")
        return details
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving subject details: {str(e)}"
        )

@app.get("/api/subjects/suggest/", response_model=List[SubjectHeading])
async def suggest_subjects(
    text: str = Query(..., min_length=2),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get subject suggestions based on text analysis
    Includes AI-enhanced subject matching
    """
    try:
        return await loc_service.get_subject_suggestions(text, limit)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )

@app.post("/api/analyze-cover/", response_model=ImageAnalysisResult)
async def analyze_cover(
    file: UploadFile = File(...),
    confidence_threshold: float = Query(0.5, ge=0.0, le=1.0)
):
    """
    Analyze book cover and suggest subjects
    
    Parameters:
    - file: Book cover image
    - confidence_threshold: Minimum confidence score for suggestions
    """
    try:
        result = await image_analyzer.analyze_book_cover(file)
        
        # Filter suggestions by confidence threshold
        result.suggested_subjects = [
            subject for subject in result.suggested_subjects
            if result.confidence_scores.get(subject.title, 0) >= confidence_threshold
        ]
        
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing cover: {str(e)}"
        )

@app.get("/api/authorities/search/")
async def search_all_authorities(
    q: str = Query(..., min_length=2),
    types: Optional[List[str]] = Query(None)
):
    """
    Search across all LOC authority files
    
    Parameters:
    - q: Search query
    - types: List of authority types to search (optional)
    """
    try:
        results = await loc_service.search_all_authorities(q)
        
        # Filter by authority types if specified
        if types:
            results = {k: v for k, v in results.items() if k in types}
            
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error searching authorities: {str(e)}"
        )

@app.get("/api/subjects/validate/")
async def validate_subjects(
    subjects: List[str] = Query(...),
    check_all_authorities: bool = Query(False)
):
    """
    Validate subjects against LOC authorities
    
    Parameters:
    - subjects: List of subjects to validate
    - check_all_authorities: Whether to check against all authority files
    """
    try:
        if check_all_authorities:
            return await image_analyzer.validate_subjects_comprehensive(subjects)
        return await image_analyzer.validate_subjects(subjects)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error validating subjects: {str(e)}"
        )

@app.get("/api/marc-fields/{lccn}")
async def get_marc_fields(lccn: str):
    """
    Get MARC fields for a specific record
    
    Parameters:
    - lccn: Library of Congress Control Number
    """
    try:
        fields = await loc_service.get_marc_fields(lccn)
        if not fields['650'] and not fields['651'] and not fields['655']:
            raise HTTPException(status_code=404, detail="No MARC fields found")
        return fields
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving MARC fields: {str(e)}"
        )

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    await loc_service.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
@app.post("/api/analyze-book/", response_model=BookAnalysisResult)
async def analyze_book(
    front_cover: UploadFile = File(...),
    back_cover: Optional[UploadFile] = File(None),
    copyright_page: Optional[UploadFile] = File(None),
    toc_page: Optional[UploadFile] = File(None),
    min_confidence: float = Query(0.98, ge=0.90, le=1.0)  # Minimum 90% confidence
):
    """
    Analyze complete book materials with high confidence requirements
    """
    analyzer = EnhancedImageAnalyzer()
    return await analyzer.analyze_book_materials(
        front_cover=front_cover,
        back_cover=back_cover,
        copyright_page=copyright_page,
        toc_page=toc_page,
        min_confidence=min_confidence
    )
