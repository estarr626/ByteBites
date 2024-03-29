from .db import db, add_prefix_for_prod
from .cart import cartItem

import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    price_cents = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500))
    image_url = db.Column(db.String(255))

    restaurant = db.relationship("Restaurant", back_populates="items")
    cart = db.relationship("Cart", secondary=cartItem, back_populates="items")


    def to_dict(self):
        return_dict = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price_cents": self.price_cents,
            "image_url": self.image_url,
            "restaurant_id": self.restaurant_id
        }

        return return_dict
