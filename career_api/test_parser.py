
import sys
import os
import json

# Add the parent directory to sys.path so we can import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from career_api.utils.resume_parser import parse_resume

sample_resume = """
John Doe
Software Engineer
john.doe@example.com | (555) 123-4567

EXPERIENCE
Frontend Developer at Tech Corp
- Built responsive UI using React and Tailwind CSS
- Integrated APIs with Axios and React Query

EDUCATION
B.Sc. Computer Science, University of Technology

SKILLS
React, TypeScript, Python, FastAPI, Git
"""

print("Running Resume Parser on sample text...")
try:
    result = parse_resume(sample_resume)
    print("\n--- Parser Output (JSON) ---")
    print(json.dumps(result, indent=2))
    print("\n--- Success ---")
except Exception as e:
    print(f"\n[ERROR] Parser failed: {e}")
