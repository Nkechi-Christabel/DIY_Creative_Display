#!/usr/bin/python3
from flask import Blueprint

app_routes = Blueprint('app_routes', __name__)

from diy_app.routes.account import *
from diy_app.routes.diy_post import *
