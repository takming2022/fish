import celery
app = celery.Celery(broker="amqp://guest:guest@localhost:5672",  # type: ignore
                    backend="rpc://guest:guest@localhost:5672")

#调度任务格式为pacakage.class#func 
# result = app.signature("com.example.celery.TestTask#sum", [1, 2]).delay().get()

# print("result is %s" % result)
for i in range(1,151):
    result1 = app.signature("com.example.celery.TestTask#pokemon_api", [i]).delay().get()
    print("result is %s" % result1)