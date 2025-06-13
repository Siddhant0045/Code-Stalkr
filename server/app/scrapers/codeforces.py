import requests
from datetime import datetime

def get_time(timestamp):
    return datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

def scrape_codeforces(link: str):
    try:
        username = link.strip("/").split("/")[-1]

        # Fetch main profile info
        user_info = requests.get(f"https://codeforces.com/api/user.info?handles={username}").json()
        if user_info["status"] != "OK":
            return {"error": user_info.get("comment", "User not found")}
        user = user_info["result"][0]

        # Fetch contest history
        rating_resp = requests.get(f"https://codeforces.com/api/user.rating?handle={username}").json()
        contests = rating_resp.get("result", [])

        contest_stats = []
        for contest in contests:
            contest_stats.append({
                "name": contest.get("contestName"),
                "rank": contest.get("rank"),
                "oldRating": contest.get("oldRating"),
                "newRating": contest.get("newRating"),
                "change": contest.get("newRating") - contest.get("oldRating"),
                "contestId": contest.get("contestId"),
                "time": get_time(contest.get("ratingUpdateTimeSeconds")),
                "link": f"https://codeforces.com/contest/{contest.get('contestId')}"
            })

        # Fetch recent 5 submissions
        status_resp = requests.get(f"https://codeforces.com/api/user.status?handle={username}&count=5").json()
        submissions = []
        if status_resp["status"] == "OK":
            for sub in status_resp["result"]:
                problem = sub.get("problem", {})
                submissions.append({
                    "problem": f"{problem.get('index')}. {problem.get('name')}",
                    "contestId": problem.get("contestId"),
                    "verdict": sub.get("verdict"),
                    "language": sub.get("programmingLanguage"),
                    "time": get_time(sub.get("creationTimeSeconds")),
                    "link": f"https://codeforces.com/contest/{problem.get('contestId')}/problem/{problem.get('index')}"
                })

        return {
            "handle": user.get("handle"),
            "rank": user.get("rank"),
            "rating": user.get("rating"),
            "maxRank": user.get("maxRank"),
            "maxRating": user.get("maxRating"),
            "contribution": user.get("contribution"),
            "friendOfCount": user.get("friendOfCount"),
            "registrationDate": get_time(user.get("registrationTimeSeconds")),
            "lastOnline": get_time(user.get("lastOnlineTimeSeconds")),
            "avatar": user.get("avatar"),
            "contests": contest_stats,
            "recentSubmissions": submissions
        }

    except Exception as e:
        return {"error": str(e)}
