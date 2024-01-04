"""empty message

Revision ID: 9fc3761bef39
Revises: 73a2e54f31eb
Create Date: 2024-01-03 16:12:40.640115

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fc3761bef39'
down_revision = '73a2e54f31eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=500),
               nullable=True)
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=500),
               nullable=False)

    # ### end Alembic commands ###