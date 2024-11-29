"""empty message

Revision ID: 628ce6f89273
Revises: 
Create Date: 2024-10-26 17:20:26.143879

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '628ce6f89273'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Answer',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('answer', sa.String(), nullable=False),
    sa.Column('importance', sa.Enum('necessarily_yes', 'important_yes', 'more_yes', 'neutral', 'more_no', 'necessarily_no', name='importance'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Characteristics',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('User',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('login', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('mail', sa.String(), nullable=False),
    sa.Column('gender', sa.Enum('male', 'female', name='gender'), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('AnswUserChar',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('characteristic_id', sa.Integer(), nullable=False),
    sa.Column('answer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['answer_id'], ['Answer.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['characteristic_id'], ['Characteristics.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('LikePartner',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('liked_user_id', sa.Integer(), nullable=False),
    sa.Column('liked_by_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('not_checked', 'like', 'dislike', name='statuslike'), nullable=False),
    sa.ForeignKeyConstraint(['liked_by_id'], ['User.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['liked_user_id'], ['User.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Partner',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('gender', sa.Enum('male', 'female', name='gender'), nullable=False),
    sa.Column('ageFrom', sa.Integer(), nullable=False),
    sa.Column('ageTo', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('RefreshToken',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('User_id', sa.Integer(), nullable=False),
    sa.Column('Token', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['User_id'], ['User.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('RefreshToken')
    op.drop_table('Partner')
    op.drop_table('LikePartner')
    op.drop_table('AnswUserChar')
    op.drop_table('User')
    op.drop_table('Characteristics')
    op.drop_table('Answer')
    # ### end Alembic commands ###