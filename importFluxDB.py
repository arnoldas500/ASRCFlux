import sqlalchemy as sql
import pandas as pd

pg = sql.create_engine('postgresql://:5433/flux')

df = pd.read_csv('/flux/2017/12/13/20171213_FLUX_BKLN_Flux_NYSMesonet.csv')

df.columns = df.columns.str.lower()

try:
    df.drop(columns=['table', 'record_number', 'year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond', 'timestamp_start', 'timestamp_end'], inplace=True)
except Exception as e:
    pass

df.to_sql('nysmesonet', pg, if_exists='append',index=False)
