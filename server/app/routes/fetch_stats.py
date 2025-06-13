from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from app.scrapers.leetcode import scrape_leetcode
from app.scrapers.codeforces import scrape_codeforces

router = APIRouter(prefix="/api")

class LinksPayload(BaseModel):
    links: List[str]

@router.post("/fetch-stats")
def fetch_stats(payload: LinksPayload):
    results = []

    for link in payload.links:
        if "leetcode.com" in link:
            stats = scrape_leetcode(link)
            platform = "leetcode"
        elif "codeforces.com" in link:
            stats = scrape_codeforces(link)
            platform = "codeforces"
        else:
            stats = {"error": "Unsupported platform"}
            platform = "unknown"

        results.append({
            "platform": platform,
            "url": link,
            "stats": stats
        })

    return results
