# from turtle import ht
import requests
from bs4 import BeautifulSoup
import pymysql
import datetime

coin_list = ['bitcoin', 'ethereum']
# coin_list = [['bitcoin','btc'], ['ethereum','eth']]

for coin in coin_list:
    req = requests.get(f'https://kr.investing.com/crypto/{coin}/historical-data')
    html = req.text
    bs = BeautifulSoup(html, 'html.parser')

    date_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(1)')
    date_info = [dom.text for dom in date_info]
    date_info = ''.join(date_info).replace('년 ', '-').replace('월 ', '-').replace('일', '')
    # 형변환을 하지 않아도 db에 insert 가능
    date_format = '%Y-%m-%d'
    date_info = datetime.datetime.strptime(date_info, date_format)
    print(date_info)

    closeprice_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(2)')
    closeprice_info = [dom.text for dom in closeprice_info]
    closeprice_info = int(''.join(closeprice_info).split('.')[0].replace(',', ''))
    # closeprice_info = ''.join(closeprice_info).split('.')[0].replace(',', '')
    print(closeprice_info)

    open_price_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(3)')
    open_price_info = [dom.text for dom in open_price_info]
    open_price_info = int(''.join(open_price_info).split('.')[0].replace(',', ''))
    print(open_price_info)
    
    high_price_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(4)')
    high_price_info = [dom.text for dom in high_price_info]
    high_price_info = int(''.join(high_price_info).split('.')[0].replace(',', ''))
    print(high_price_info)

    low_price_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(5)')
    low_price_info = [dom.text for dom in low_price_info]
    low_price_info = int(''.join(low_price_info).split('.')[0].replace(',', ''))
    print(low_price_info)

    tradingvolume_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(6)')
    tradingvolume_info = [dom.text for dom in tradingvolume_info]
    tradingvolume_info = ''.join(tradingvolume_info)
    print(tradingvolume_info)

    fluctuations_info = bs.select('#curr_table > tbody > tr:nth-child(2) > td:nth-child(7)')
    fluctuations_info = [dom.text for dom in fluctuations_info]
    fluctuations_info = ''.join(fluctuations_info)
    print(fluctuations_info)

    # 크롤링 데이터 db에 insert
    conn = pymysql.connect(host='192.168.242.236',
                        user='root',
                        password='0411',
                        db='mydb',
                        charset='utf8')

    sql = "INSERT INTO test VALUES (%s, %s, %s, %s, %s, %s, %s)"

    with conn:
        with conn.cursor() as cur:
            cur.execute(sql, (date_info, closeprice_info, open_price_info, high_price_info, low_price_info, tradingvolume_info, fluctuations_info))
            conn.commit()