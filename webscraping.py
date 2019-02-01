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
        data['article_image'] = str(article_image).split('">')[0].strip('<media:content medium="image" url=')



        article_title = item.find('title')
        article_link = item
        data['article_title'] = str(article_title).strip('<title>').strip('</').replace('&amp;apos','\'')
        data['article_link'] = str(article_link).split(' <t')[0].lstrip("<item> <link/>").replace('<link/>','').strip()
        article_author = item.find('atom:name')
        data['article_author'] = str(article_author).strip('<atom:name>').rstrip(', Contributor</').replace('&amp;apos','\'')

        article_date = item.find('pubdate')
        data['article_date'] = str(article_date).strip('<pubdate>').strip(': -0500</')


        article_description = item.find('description')
        data['description'] = str(article_description).strip('<description>').strip('/>').strip('<').replace('&amp;apos','\'')


        l.append(data)

    return l[13::2]


if __name__ == "__main__":
    print(scrape())
