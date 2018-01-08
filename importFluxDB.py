#enter date range for populate function to get nysmesonet data and populate postgres DB with all important columns
import sqlalchemy as sql
import psycopg2
import pandas as pd
import numpy as np
import datetime
from datetime import date, timedelta
import io
import os, re
import glob

#need to pass sites to select

def populate(dateStartList, dateEndList):

    #make database connection
    pg = sql.create_engine('postgresql:///flux')
    
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
            #grab each file
            for site in select:
                df = pd.read_csv('/flux/' + dateSlash + '/' + dateStrp + '_FLUX_'+ site +'_Flux_NYSMesonet.csv')
            #make all cols lowercase
            df.columns = df.columns.str.lower()
            #if the columns are there drop these
            try:
                df.drop(columns=['table', 'record_number', 'year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond', 'timestamp_start', 'timestamp_end'], inplace=True)
            except Exception as e:
                pass
            #fill in DB from dataframe
            df.to_sql('nysmesonet', pg, if_exists='append',index=False)
            fileExists = True
            
        except FileNotFoundError as e:
            print(e)
        x+=1

    if(not fileExists):
        raise FileNotFoundError("no data found at all!!!")

    

    #df = pd.read_csv('/flux/2017/12/13/20171213_FLUX_BKLN_Flux_NYSMesonet.csv')

    

'''
how function should be called
*********************
start list
['2017', '02', '02']
end list: 
['2017', '12', '13']
*********************
'''

start = ['2017', '02', '02']
end = ['2017', '12', '13']

#populate(start,end)

def nan_to_null(f, _NULL=psycopg2.extensions.AsIs('NULL'), _NaN=np.NaN, _Float=psycopg2.extensions.Float):
    if f is not np.isnan(f):
        return _Float(f)
    return _NULL
psycopg2.extensions.register_adapter(float, nan_to_null)

def easyPop():
    #make database connection
    pg = sql.create_engine('postgresql:///flux')

    #get a list of all of the files
    files = glob.glob('/flux/*/*/*/*_Flux_NYSMesonet.csv')

    #loop through all of the files and add to DB
    for file in files:
        na = ('NAN', 'inf')
        df = pd.read_csv(file, na_values=na)

        
        #make all cols lowercase
        df.columns = df.columns.str.lower()

        for col in df.columns:
            try:
                if np.isinf(df[col]).any():
                    print(df[col])
            except Exception as e:
                pass
        
        
        df.drop(columns=['table', 'record_number', 'year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond', 'timestamp_start', 'timestamp_end'], inplace=True)
        #if the columns are there drop these
        try:
            df.drop(columns=['table', 'record_number', 'year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond', 'timestamp_start', 'timestamp_end'], inplace=True)
        except Exception as e:
            pass
        
        df = df.where(pd.notnull(df), None)
        #df = df.where(~np.isinf(df), None)
        #df.replace('NAN', None,inplace=True)
        #fill in DB from dataframe
        df.to_sql('nysmesonet', pg, if_exists='append',index=False)
    

easyPop()
