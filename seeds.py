from pony.orm import db_session
from app import db
from models.Pool import Pool, PoolSchema, Comment, CommentSchema
from models.User import User, UserSchema


db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    schema = UserSchema()
    emma = User(
        username='emma',
        email='ekprice01@gmail.com',
        password_hash=schema.generate_hash('pass')
    )

    pool_one = Pool(
        name='Kenwood Ladies\' Bathing Pond',
        image='https://storify.com/services/proxy/2/Wzk4uTfDIg4TLKDVtWNSjw/https/d2kmm3vx031a1h.cloudfront.net/O7p7wh3vRkGK8G70Kg6y_20170719_101823.jpg',
        description='The Kenwood Ladies’ Pond is situated on Millfield Lane on the eastern edge of Hampstead Heath.',
        type='pool',
        address='Hampstead Heath, Highgate, London NW3 1AS',
        long='-0.175135',
        lat='51.563260',
        region='London',
        heated=False,
        country='England',
        user=emma
    )

    pool_two = Pool(
        name='Serpentine Lido',
        image='https://f3e6t7k9.stackpathcdn.com/wp-content/uploads/2017/03/serpentine-loti.jpg',
        description='The lake is used all year around by the Serpentine Swimming Club and users of the Serpentine Lido. Regular triathlete sessions also take place.',
        type='lido',
        address='Hyde Park, London W2 2UH',
        long='-0.165690',
        lat='51.507721',
        region='London',
        heated=False,
        country='England',
        user=emma
    )

    pool_three = Pool(
        name='Portobello Beach',
        image='https://www.contiki.com/six-two/wp-content/uploads/2016/03/wild-swimming-edinburgh-header.jpg',
        description='The triathlon branch of the Edinburgh Road Club runs Friday night sessions on Portobello beach from May to October.',
        type='sea',
        address='Edinburgh, EH15',
        long='-3.117045',
        lat='55.958451',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_four = Pool(
        name='Stonehaven Open Air Pool',
        image='https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2015/07/Stonehaven-Swimming-Pool.jpg',
        description='Seawater (fully filtrated) heated lido, 50m x 18m, built in 1930s art deco style, and painted in primary colours to look cheerful even when its pouring with rain. Offers weekly floodlit midnight swims.',
        type='lido',
        address='Queen Elizabeth Park, Aberdeen, AB39 2RD',
        long='-2.208420',
        lat='56.968571',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_five = Pool(
        name='New Cumnock Swimming Pool',
        image='https://images-e.jpimedia.uk/imagefetch/w_700,f_auto,ar_3:2,q_auto:low,c_fill/if_h_lte_200,c_mfit,h_201/https://www.scotsman.com/webimage/1.4558959.1505316094!/image/image.jpg',
        description='Freshwater heated pool, 23m x 12m, built in the 1960s.',
        type='lido',
        address='New Cumnock, HA18 4AH',
        long='-98.991403',
        lat='19.365097',
        region='Wales',
        heated=True,
        country='Wales',
        user=emma
    )

    pool_six = Pool(
        name='Ilkley Pool and Lido',
        image='https://lh3.googleusercontent.com/2WAKwSWs22QEBuQ-fq3c2ypLaT5DIfDwpccj9peSIFwqeMyJ2AFtBiWNUgpcT1ypjEz9-Sw=w1080-h608-p-no-v0',
        description='Situated on the edge of Ilkley Moor and surrounded by wide open countryside, this freshwater lido is circular (46cm in diameter) with a central foundtain and slide. There is a smaller heated pool on site.',
        type='lido',
        address='Denton Road, Ilkley LS29 0BZ',
        long='-1.819177',
        lat='53.932506',
        region='Yorkshire and the Humber',
        heated=False,
        country='England',
        user=emma
    )

    pool_seven = Pool(
        name='Parliament Hill Fields Lido',
        image='https://48cdp72nsn98y4xzwvlsdhp1-wpengine.netdna-ssl.com/wp-content/uploads/sites/13/2018/04/Lido4.jpg',
        description='Grade II listed in January 1999 as one of the finest surviving exampels of a 1930s lido left in the UK. 70m x 30m and was fitted with a unique steel lining in 2005 which twinkles at swimmers as they plough up and down, changing the colour of the water with the daylight, from pale green and pale blue to silvery grey. Wonderful geometric simplicity and open all year. Unheated.',
        type='lido',
        address='Gordon House Road, Hampstead, London, NW5 1LP',
        long='-0.148416',
        lat='51.556147',
        region='London',
        heated=False,
        country='England',
        user=emma
    )

    pool_eight = Pool(
        name='Llyn Hywel, Snowdonia',
        image='https://wildswim.com/imageprocessor/e717e298-34d7-47e6-a976-9aa1095948e0.jpg?width=800&height=480&mode=crop',
        description='Lakes and tarns are never move spectacular than when hidden away, and this very wild, very high tarn can only be reached after about an hour\'s walk, nestled between two of the higest peaks in the Rhinog mountains.',
        type='lake',
        address='Llyn Hywel, Snowdonia, Gwynedd, LL45 2PL',
        long='-4.055620',
        lat='52.840279',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    comment_one = Comment(
        content='Favourite pool in London',
        user=emma,
        pool=pool_one
    )

    comment_two = Comment(
        content='Most relaxing place to swim',
        user=emma,
        pool=pool_six
    )


db.commit()