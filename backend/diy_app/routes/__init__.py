from flask import Blueprint

app_routes = Blueprint('app_routes', __name__)

from diy_app.routes.account import *
from diy_app.routes.diy_post import *
from diy_app.routes.like_route import *
from diy_app.routes.comment_route import *
from diy_app.routes.save_route import *
from diy_app.routes.search_filter import *