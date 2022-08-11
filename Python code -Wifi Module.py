import serial.tools.list_ports as port_list
import serial
import time
while (True):
    ports = list(port_list.comports())
    for p in ports:
        print (p)
    ser = serial.Serial('COM3')  # open serial port
    ser.reset_input_buffer()
    print("Reading Serial data....Please wait")
    ser.readline()
    parkdata=ser.readline()
    L1S1 = parkdata[1]-48
    L1S2 = parkdata[2]-48
    L2S1 = parkdata[3]-48
    L2S2 = parkdata[4]-48
    free= parkdata[5]-48
    print("L1S1=", L1S1)
    print("L1S2=",L1S2)
    print("L2S1=",L2S1)
    print("L2S2=",L2S2)
    print("Total Free=",free)
    ser.close()
    import os
    sys_cmd1= "curl -k --data"
    sys_cmd2= " \"field1=" + str(L1S1)+ "&field2=" +str(L1S2) + "&field3=" +str(L2S1)+ "&field4=" + str(L2S2)+ "&field5=" +str(free) + "\""
    sys_cmd3=  " https://api.thingspeak.com/update?api_key=HII1G767HWI527H3"
    print (sys_cmd1+sys_cmd2+sys_cmd3)
    sys_os=os.system(sys_cmd1+sys_cmd2+sys_cmd3)
    print(sys_os)
    time.sleep(10)
