import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { patientLog, sampleData } from './sampleData';


const PatientManagementApp: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<patientLog | null>(null);

  const handlePatientChange = (value: string) => {
    const patient = sampleData.find(p => p.userId === value);
    setSelectedPatient(patient || null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <img src="AIhayashFace.png" className="w-24 h-24 rounded-full" />
        <h1 className="text-2xl font-bold">AI林さんのヒアリング結果</h1>
        <Select onValueChange={handlePatientChange}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="患者さんを選択してください" />
          </SelectTrigger>
          <SelectContent>
            {sampleData.map(patient => (
              <SelectItem key={patient.userId} value={patient.userId}>{patient.displayName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPatient && (
        <div className="mt-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>会話の要約</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>いつから:</strong> {selectedPatient.summary.fromWhen}</p>
              <p><strong>どのように:</strong> {selectedPatient.summary.how}</p>
              <p><strong>痛みの程度:</strong> {selectedPatient.summary.amountOfPain}</p>
              <p><strong>その他:</strong> {selectedPatient.summary.others}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>会話ログ</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPatient.talkLog.map((conversation, index) => (
                <p key={index} className={conversation.speaker === "看護師" ? "text-blue-600" : "text-green-600"}>
                  <strong>{conversation.speaker}:</strong> {conversation.message}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatientManagementApp;