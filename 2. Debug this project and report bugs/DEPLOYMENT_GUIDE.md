# 🚀 Deployment Guide - Personal Finance Copilot

This guide covers deploying your Personal Finance Copilot application to production using Vercel (frontend) and Render/Heroku (backend).

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account (free)
- Render account (free) or Heroku account

## 🎯 Deployment Options

### Option 1: Vercel + Render (Recommended)
- **Frontend**: Vercel (React)
- **Backend**: Render (FastAPI)
- **Database**: Render PostgreSQL (free tier)

### Option 2: Vercel + Heroku
- **Frontend**: Vercel (React)
- **Backend**: Heroku (FastAPI)
- **Database**: Heroku Postgres (free tier)

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend for Deployment

The frontend is already configured for Vercel deployment with:
- `vercel.json` configuration
- Environment variable support
- Build scripts

### 2. Deploy to Vercel

#### Method A: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name
# - Confirm deployment settings
```

#### Method B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3. Configure Environment Variables

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

### 4. Update CORS in Backend

Update the CORS origins in `backend/main.py`:
```python
origins = [
    "http://localhost:3000",
    "https://your-app.vercel.app",  # Your Vercel domain
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]
```

## 🔧 Backend Deployment

### Option A: Render (Recommended)

#### 1. Prepare Backend
The backend is configured with:
- `render.yaml` for automatic deployment
- Environment variable support
- Health check endpoint

#### 2. Deploy to Render
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `personal-finance-copilot-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

#### 3. Add Environment Variables
In Render dashboard:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
OPENAI_API_KEY=sk-your-openai-key-here
FRONTEND_URL=https://your-app.vercel.app
```

#### 4. Add PostgreSQL Database
1. Go to "New +" → "PostgreSQL"
2. Configure:
   - **Name**: `finance-copilot-db`
   - **Plan**: Free
3. Copy the database URL
4. Add to environment variables:
   ```
   DATABASE_URL=postgresql://user:pass@host:port/dbname
   ```

### Option B: Heroku

#### 1. Prepare Backend
The backend includes:
- `Procfile` for Heroku
- `runtime.txt` for Python version
- `app.json` for configuration

#### 2. Deploy to Heroku
```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-finance-copilot-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key-here
heroku config:set DEBUG=False
heroku config:set OPENAI_API_KEY=sk-your-openai-key-here
heroku config:set FRONTEND_URL=https://your-app.vercel.app

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### 3. Verify Deployment
```bash
# Check logs
heroku logs --tail

# Open app
heroku open

# Check health
curl https://your-app.herokuapp.com/health
```

## 🔗 Connect Frontend to Backend

### 1. Update API URL
In Vercel environment variables:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
# or
REACT_APP_API_URL=https://your-app.herokuapp.com
```

### 2. Test Connection
1. Deploy frontend changes
2. Test API calls in browser console
3. Check network tab for errors

## 🗄️ Database Setup

### Render PostgreSQL
- Automatically created with web service
- Connection string provided in environment variables
- No additional setup required

### Heroku PostgreSQL
- Automatically created with addon
- Connection string in `DATABASE_URL`
- No additional setup required

## 🔒 Security Configuration

### 1. Environment Variables
Never commit sensitive data:
```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo "*.env" >> .gitignore
```

### 2. CORS Configuration
Update allowed origins in backend:
```python
origins = [
    "https://your-app.vercel.app",
    "https://your-custom-domain.com",
]
```

### 3. API Keys
- Store OpenAI API key in environment variables
- Rotate keys regularly
- Use different keys for development/production

## 📊 Monitoring & Logs

### Vercel
- Built-in analytics
- Function logs in dashboard
- Performance monitoring

### Render
- Logs in dashboard
- Health check monitoring
- Automatic restarts

### Heroku
```bash
# View logs
heroku logs --tail

# Monitor dyno
heroku ps

# Check addons
heroku addons
```

## 🔄 Continuous Deployment

### Automatic Deployments
Both Vercel and Render support automatic deployments:
1. Push to `main` branch
2. Automatic build and deploy
3. Preview deployments for PRs

### Manual Deployments
```bash
# Vercel
vercel --prod

# Render (via dashboard)
# Heroku
git push heroku main
```

## 🚨 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **CORS errors** | Update origins in backend CORS config |
| **API connection failed** | Check `REACT_APP_API_URL` environment variable |
| **Database connection failed** | Verify `DATABASE_URL` is set correctly |
| **Build failures** | Check build logs for dependency issues |
| **Environment variables not working** | Restart deployment after adding variables |

### Debug Commands

```bash
# Check frontend build
cd frontend && npm run build

# Test backend locally
cd backend && python main.py

# Check environment variables
echo $REACT_APP_API_URL
echo $DATABASE_URL

# Test API endpoints
curl https://your-backend-url/health
curl https://your-backend-url/
```

### Log Analysis

```bash
# Vercel logs (in dashboard)
# Render logs (in dashboard)
# Heroku logs
heroku logs --tail
```

## 📈 Performance Optimization

### Frontend (Vercel)
- Enable compression
- Use CDN for static assets
- Optimize bundle size

### Backend (Render/Heroku)
- Enable caching headers
- Optimize database queries
- Use connection pooling

### Database
- Add indexes for common queries
- Monitor query performance
- Regular maintenance

## 🔄 Updates & Maintenance

### Regular Tasks
1. **Security updates**: Update dependencies monthly
2. **Database backups**: Automatic with managed databases
3. **Monitoring**: Check logs weekly
4. **Performance**: Monitor response times

### Deployment Updates
```bash
# Frontend
git push origin main  # Triggers Vercel deployment

# Backend
git push origin main  # Triggers Render/Heroku deployment
```

## 🎉 Success Checklist

- ✅ Frontend deployed to Vercel
- ✅ Backend deployed to Render/Heroku
- ✅ Database connected and working
- ✅ Environment variables configured
- ✅ CORS properly configured
- ✅ API endpoints responding
- ✅ Frontend connecting to backend
- ✅ File uploads working
- ✅ AI features working (if configured)
- ✅ Health checks passing

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

---

**Happy deploying! 🚀** 