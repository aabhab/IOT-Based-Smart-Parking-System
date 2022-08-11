const int SensePinL1S1 = 6;
const int SensePinL1S2 = 7;
const int SensePinL2S1 = 8;
const int SensePinL2S2 = 9;

const int ledPin = 13;
String strL1S1, strL1S2, strL2S1, strL2S2;
int total_free;

void setup() {
  Serial.begin(9600);

  pinMode(ledPin, OUTPUT);
  pinMode(SensePinL1S1, INPUT_PULLUP);
  pinMode(SensePinL1S2, INPUT_PULLUP);
  pinMode(SensePinL2S1, INPUT_PULLUP);
  pinMode(SensePinL2S2, INPUT_PULLUP);
  digitalWrite(ledPin, LOW);
  delay(1500);
  Serial.println("Welcome To SMART Parking VIT");
  delay(1500);
}

void loop() {

  total_free = 4;
  if (digitalRead(SensePinL1S1) == 1)
  {
    //Serial.println("L1 S1 Empty");
    strL1S1 = "1";
  }
  else
  {
    //Serial.println("L1 S1 Full");
    strL1S1 = "0";
    if (total_free > 0)
      total_free--;
  }

  if (digitalRead(SensePinL1S2) == 1)
  {
    //Serial.println("L1 S2 Empty");
    strL1S2 = "1";
  }
  else
  {
    //Serial.println("L1 S2 Full");
    strL1S2 = "0";
    if (total_free > 0)
      total_free--;
  }
  if (digitalRead(SensePinL2S1) == 1)
  {
    //Serial.println("L2 S1 Empty");
    strL2S1 = "1";


  }
  else
  {
    //mySerial.println("L2 S1 Full");
    strL2S1 = "0";
    if (total_free > 0)
      total_free--;
  }
  if (digitalRead(SensePinL2S2) ==1)
  {
    //Serial.println("L2 S2 Empty");
    strL2S2 = "1";
  }
  else
  {
    //Serial.println("L2 S2 Full");
    strL2S2 = "0";
    if (total_free > 0)
      total_free--;
  }
  digitalWrite(ledPin, HIGH);
  sendData();
  digitalWrite(ledPin, LOW);
  delay(5000);
}

//$XXXXT
//
void sendData()
{
  String getData1 = "$" + strL1S1 + strL1S2 + strL2S1  + strL2S2  + total_free;
  Serial.println(getData1);
}
