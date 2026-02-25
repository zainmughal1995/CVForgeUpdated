FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run migrations then start server
CMD python manage.py migrate && \
    gunicorn config.wsgi:application --bind 0.0.0.0:10000