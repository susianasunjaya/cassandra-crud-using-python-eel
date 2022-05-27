from cassandra.cluster import Cluster
import uuid
import eel
import os

eel.init(f'{os.path.dirname(os.path.realpath(__file__))}/web')

cluster = Cluster(['3.227.155.149'])
# cluster = Cluster(['54.80.169.232'])
session = cluster.connect('susi')


@eel.expose
def insert(judul, penulis, penerbit):
    session.execute(
        "INSERT INTO buku (id, judul, penulis, penerbit) VALUES ( %s, %s, %s, %s)",(str(uuid.uuid1()), str(judul), str(penulis), str(penerbit))
    )
    eel.prompt_alerts('Data Berhasil ditambahkan di Database')

@eel.expose
def select():
    rows = session.execute(
        "SELECT * FROM buku"
    )
    listid = []
    listjudul = []
    listpenulis = []
    listpenerbit = []
    for row in rows:
        listid.append(row.id)
        listjudul.append(row.judul)
        listpenulis.append(row.penulis)
        listpenerbit.append(row.penerbit)
    databuku = [listid, listjudul, listpenulis, listpenerbit]
    return databuku
    
    

@eel.expose
def update(id,judul,penulis,penerbit):
    session.execute(
        "UPDATE buku SET judul = %s, penulis = %s, penerbit = %s WHERE id=%s", (judul, penulis, penerbit, id)
    )
    eel.prompt_alerts('Berhasil Update Item dari Database')

@eel.expose
def delete(id):
    session.execute(
        "DELETE FROM buku WHERE id=%s", [id]
    )
    eel.prompt_alerts('Berhasil Terhapus dari Database')

eel.start('index.html')
