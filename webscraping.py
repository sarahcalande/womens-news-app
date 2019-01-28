import requests
from bs4 import BeautifulSoup




page = requests.get('https://www.forbes.com/forbeswomen/')
soup = BeautifulSoup(page.content, 'html.parser')




weblinks = soup.find_all('.stream-article-wrapper ng-scope')

pagelinks = []

for link in weblinks[1:]:
      url = link.contents[0].find_all('a')[0]
      pagelinks.append('http://forbes.com/'+url.get('href'))


print(soup.body)


authorname = []
title = []
thearticle = []
for link in pagelinks:
    # store the text for each article
    paragraphtext = []
    # get url
    url = link
    # get page text
    page = requests.get(url)
    # parse with BFS
    soup = BeautifulSoup(page.text, 'html.parser')
    # get author name, if there's a named author
    try:
        abody = soup.find(class_='.stream-article-wrapper ng-scope').find('a')
        aname = abody.get_text()
    except:
        aname = 'Anonymous'
    # get article title
    atitle = soup.find(class_=".ng-binding")
    thetitle = atitle.get_text()
    # get main article page
    articlebody = soup.find(class_='_61c55')
    # get text
    articletext = soup.find_all('p')[8:]
    # print text
    for paragraph in articletext[:-1]:
        # get the text only
        text = paragraph.get_text()
        paragraphtext.append(text)
    # combine all paragraphs into an article
    thearticle.append(paragraphtext)
    authorname.append(aname)
    title.append(thetitle)
myarticle = [' '.join(article) for article in thearticle]

# save article data to file
data = {'Title':title,
        'Author':authorname,
        'PageLink':pagelinks,
        'Article':myarticle,
        'Date':datetime.now()}
