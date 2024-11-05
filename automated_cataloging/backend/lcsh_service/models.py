from pydantic import BaseModel
from typing import List, Optional, Dict

class ClassificationNumber(BaseModel):
    lcc: Optional[str] = None
    ddc: Optional[str] = None
    scheme: Optional[str] = None
    oclc: Optional[str] = None

class LanguageDetection(BaseModel):
    language: str
    confidence: float
    script: str  # 'roman', 'cyrillic', 'cjk', 'arabic', etc.

class BookMetadata(BaseModel):
    isbn: Optional[str] = None
    year: Optional[str] = None
    publisher: Optional[str] = None
    lccn: Optional[str] = None
    language: Optional[LanguageDetection] = None
    subjects: List[str] = []
    chapters: List[str] = []

class SubjectHeading(BaseModel):
    id: str
    title: str
    uri: Optional[str] = None
    type: List[str] = []
    broader: List[str] = []
    narrower: List[str] = []
    related: List[str] = []
    classification: Optional[ClassificationNumber] = None
    metadata: Optional[Dict] = None
    note: Optional[str] = None
    created: Optional[str] = None
    modified: Optional[str] = None
    variants: List[str] = []
    confidence: float = 0.0  # Added confidence score

class BookAnalysisResult(BaseModel):
    metadata: BookMetadata
    suggested_subjects: List[SubjectHeading]
    confidence_scores: Dict[str, float]
    extracted_text: Dict[str, str]
    authorities_used: List[str]
    language_info: LanguageDetection
    overall_confidence: float
