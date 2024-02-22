#!/usr/bin/python3
from flask import Blueprint

app_routes = Blueprint('app_routes', __name__)

from app.routes.main import *