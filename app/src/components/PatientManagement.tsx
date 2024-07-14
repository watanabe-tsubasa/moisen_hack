'use client'

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SelectValue } from '@radix-ui/react-select';

interface Patient {
  id: number;
  name: string;
}

interface Questionnaire {
  症状: string;
  既往歴: string;
  アレルギー: string;
}

interface Conversation {
  speaker: string;
  message: string;
}

interface PatientData {
  [key: number]: {
    questionnaire: Questionnaire;
    conversations: Conversation[];
  };
}

const patients: Patient[] = [
  { id: 1, name: "山田太郎" },
  { id: 2, name: "佐藤花子" },
  { id: 3, name: "鈴木一郎" }
];

const patientData: PatientData = {
  1: {
    questionnaire: {
      症状: "頭痛、めまい",
      既往歴: "高血圧",
      アレルギー: "なし"
    },
    conversations: [
      { speaker: "看護師", message: "どのような症状がありますか？" },
      { speaker: "患者", message: "3日前から頭痛とめまいが続いています。" },
      { speaker: "看護師", message: "普段のお薬は飲まれていますか？" },
      { speaker: "患者", message: "はい、血圧の薬は毎日飲んでいます。" }
    ]
  },
  2: {
    questionnaire: {
      症状: "咳、熱",
      既往歴: "喘息",
      アレルギー: "ハウスダスト"
    },
    conversations: [
      { speaker: "看護師", message: "いつから症状がありますか？" },
      { speaker: "患者", message: "昨日の夜から咳が出始め、今朝から熱もあります。" },
      { speaker: "看護師", message: "喘息の症状は出ていますか？" },
      { speaker: "患者", message: "今のところ喘息の症状はありません。" }
    ]
  },
  3: {
    questionnaire: {
      症状: "腰痛",
      既往歴: "なし",
      アレルギー: "花粉"
    },
    conversations: [
      { speaker: "看護師", message: "腰痛はいつからですか？" },
      { speaker: "患者", message: "1週間ほど前から徐々に痛くなってきました。" },
      { speaker: "看護師", message: "痛みの程度はどうですか？" },
      { speaker: "患者", message: "歩くのが少し辛いくらいです。" }
    ]
  }
};

const PatientManagementApp: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<PatientData[keyof PatientData] | null>(null);

  const handlePatientChange = (value: string) => {
    setSelectedPatient(patientData[parseInt(value)]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">患者管理システム</h1>
      <Select onValueChange={handlePatientChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="患者を選択" />
        </SelectTrigger>
        <SelectContent>
          {patients.map(patient => (
            <SelectItem key={patient.id} value={patient.id.toString()}>{patient.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedPatient && (
        <div className="mt-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>問診表</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(selectedPatient.questionnaire).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>会話ログ</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPatient.conversations.map((conversation, index) => (
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
