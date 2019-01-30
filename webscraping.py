import requests
from bs4 import BeautifulSoup



def scrape():
    l =[]
    r = requests.get('https://www.forbes.com/forbeswomen/feed2/')
    soup = BeautifulSoup(r.text, "html.parser")

    channel = soup.find('channel')


    for item in channel:
        data = {}

        article_image = item.find('media:content')
        data['article_image'] = str(article_image)



        article_title = item.find('title')
        article_link = item.find('link')
        data['article_title'] = str(article_title)
        data['article_link'] = str(article_link)

        article_author = item.find('atom:name')
        data['article_author'] = str(article_author)

        article_date = item.find('pubDate')
        data['article_date'] = str(article_date)


        article_description = item.find('description')
        data['description'] = str(article_description)


        l.append(data)

    return l


if __name__ == "__main__":
    print(scrape())
