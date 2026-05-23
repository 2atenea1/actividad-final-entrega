FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PORT=3003
EXPOSE 3003
HEALTHCHECK --interval=30s --timeout=5s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:3003/health')"
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-3003} app:app"]
