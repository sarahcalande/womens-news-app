import requests
from bs4 import BeautifulSoup

#starts at [13]

def scrape():
    l =[]
    r = requests.get('https://www.forbes.com/forbeswomen/feed2/')
    soup = BeautifulSoup(r.text, "html.parser")

    channel = soup.find('channel')


    print(channel)

    for item in channel:
        data = {}

        article_image = item.find('media:content')
        data['article_image'] = str(article_image).rsplit('<media:thumbnail ', 1)[0]



        article_title = item.find('title')
        article_link = item
        data['article_title'] = str(article_title).strip('<title>').strip('</')
        data['article_link'] = str(article_link).strip('<item>').rsplit(' <title>', 1)[0]
        article_author = item.find('atom:name')
        data['article_author'] = str(article_author).strip('<atom:name>')

        article_date = item.find('pubdate')
        data['article_date'] = str(article_date).strip('<pubdate>').strip(': -0500</')


        article_description = item.find('description')
        data['description'] = str(article_description).strip('<description>').strip('/>').strip('<')


        l.append(data)

    return l[13::2]


if __name__ == "__main__":
    print(scrape())
