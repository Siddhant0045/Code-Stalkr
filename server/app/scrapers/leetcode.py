import requests

def scrape_leetcode(link: str):
    try:
        username = link.strip("/").split("/")[-1]
        graphql_url = "https://leetcode.com/graphql"

        # Main query
        profile_query = """
        query getUserProfile($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }

          matchedUser(username: $username) {
            username
            profile {
              ranking
              userAvatar
              realName
              skillTags
            }

            languageProblemCount {
              languageName
              problemsSolved
            }

            tagProblemCounts {
              advanced {
                tagName
                problemsSolved
              }
              fundamental {
                tagName
                problemsSolved
              }
              intermediate {
                tagName
                problemsSolved
              }
            }

            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }

            userCalendar {
              streak
              totalActiveDays
            }
          }

          userContestRanking(username: $username) {
            attendedContestsCount
            globalRanking
            topPercentage
            rating
            totalParticipants
          }

          userProfileUserQuestionProgressV2(userSlug: $username) {
            totalQuestionBeatsPercentage
            userSessionBeatsPercentage {
              difficulty
              percentage
            }
          }
        }
        """

        profile_vars = {"username": username}

        profile_response = requests.post(
            graphql_url,
            json={"query": profile_query, "variables": profile_vars},
            headers={"Content-Type": "application/json"}
        )

        if profile_response.status_code != 200:
            return {"error": "Failed to fetch profile data from LeetCode"}

        profile_data = profile_response.json()["data"]

        matched = profile_data["matchedUser"]
        stats = matched["submitStats"]["acSubmissionNum"]

        # Recent submissions query
        submissions_query = """
        query recentSubmissions($username: String!) {
          recentSubmissionList(username: $username, limit: 5) {
            title
            titleSlug
            statusDisplay
            lang
            time
          }
        }
        """

        submissions_vars = {"username": username}

        submissions_response = requests.post(
            graphql_url,
            json={"query": submissions_query, "variables": submissions_vars},
            headers={"Content-Type": "application/json"}
        )

        if submissions_response.status_code != 200:
            return {"error": "Failed to fetch recent submissions"}

        recent_submissions = submissions_response.json()["data"]["recentSubmissionList"]

        result = {
            "username": matched.get("username"),
            "realName": matched.get("profile", {}).get("realName"),
            "avatar": matched.get("profile", {}).get("userAvatar"),
            "ranking": matched.get("profile", {}).get("ranking"),
            "skillTags": matched.get("profile", {}).get("skillTags", []),
            "easy": next((x["count"] for x in stats if x["difficulty"] == "Easy"), 0),
            "medium": next((x["count"] for x in stats if x["difficulty"] == "Medium"), 0),
            "hard": next((x["count"] for x in stats if x["difficulty"] == "Hard"), 0),
            "total_problems_solved": next((x["count"] for x in stats if x["difficulty"] == "All"), 0),
            "languageProblemCount": matched.get("languageProblemCount", []),
            "tagProblemCount": matched.get("tagProblemCounts", {}),
            "streak": matched.get("userCalendar", {}).get("streak", 0),
            "totalActiveDays": matched.get("userCalendar", {}).get("totalActiveDays", 0),
            "contestStats": profile_data.get("userContestRanking", {}),
            "beatsPercentage": profile_data.get("userProfileUserQuestionProgressV2", {}),
            "recentSubmissions": recent_submissions
        }

        return result

    except Exception as e:
        return {"error": str(e)}
