RUN Apps

### **Prerequisites**

install python3.11
https://www.python.org/downloads/release/python-3110/

after successful installation below command should run
python --version

output should be 
Python 3.11.11

install node18+
https://nodejs.org/en/download

after successful installation below command should run
node -v #command 1
npm -v  #command 2

output should be
v18.17.1
9.6.7



### **Run Backend**

cd backend
python3.11 -m venv .venv        #used pyton3.11
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python3.11 main.py

### **Run Fronend**

# Terminal 2 - Frontend
cd frontend
npm install
npm run start