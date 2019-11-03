# Generated by Django 2.1.7 on 2019-11-03 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('todo_api', '0002_delete_todo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=50)),
                ('desc', models.CharField(max_length=256)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
    ]