import sqlalchemy as sql
import pandas as pd

'''
*********************
start list
['2017', '11', '01']
end list: 
['2017', '12', '13']
*********************
'''

def populate(dateStartList, dateEndList):

    #make database connection
    pg = sql.create_engine('postgresql://:5433/flux')
    
    #getting range of dates
    def perdelta(start, end, delta):
        curr = start
        while curr < end:
            yield curr
            curr += delta
    #ex date(2017, 10, 10)
    dfList = []
    #getting all of the selected csv files according to date and sotring them into a list

    x=0
    last = datetime.date(int(dateEndList[0]), int(dateEndList[1]), int(dateEndList[2]))
    lastPlus = last + timedelta(days=1)
    for curDate in perdelta(datetime.date(int(dateStartList[0]),int(dateStartList[1]),int(dateStartList[2])), lastPlus, timedelta(days=1)):
        try:
            
            curDateSTR = curDate.strftime('%Y/%m/%d')
        
            dateSlash = curDateSTR.replace("-","/")
            dateStrp = curDateSTR.replace("/","")
            df74 = pd.read_csv('/flux/' + dateSlash + '/' + dateStrp + '_FLUX_'+ select +'_Flux_NYSMesonet.csv')
            fileExists = True
            
        except FileNotFoundError as e:
            print(e)
        x+=1

    if(not fileExists):
        raise FileNotFoundError("no data found at all!!!")

    

    df = pd.read_csv('/flux/2017/12/13/20171213_FLUX_BKLN_Flux_NYSMesonet.csv')

    df.columns = df.columns.str.lower()

    try:
        df.drop(columns=['table', 'record_number', 'year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond', 'timestamp_start', 'timestamp_end'], inplace=True)
    except Exception as e:
        pass

    df.to_sql('nysmesonet', pg, if_exists='append',index=False)
