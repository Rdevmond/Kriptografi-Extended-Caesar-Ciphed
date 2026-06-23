import React from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  type Edge,
  type Node,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '../UI/Card';
import { GitBranch } from 'lucide-react';

import { useCipherContext } from '../../context/CipherContext';
import { N, CHARACTER_SET } from '../../utils/cryptography';

export const FlowchartModule: React.FC = () => {
  const { plaintext, ciphertext, key, mode, validateKey } = useCipherContext();
  
  const k = typeof key === 'number' ? validateKey(key) : 0;
  
  // Ambil karakter pertama sebagai contoh untuk flowchart
  const sampleChar = mode === 'encrypt' ? plaintext[0] : ciphertext[0];
  const sampleIndex = sampleChar ? CHARACTER_SET.indexOf(sampleChar) : -1;
  let resultIndex = -1;
  let resultChar = '';
  let operationText = 'Operasi Modulo';

  if (sampleIndex !== -1 && sampleChar) {
    if (mode === 'encrypt') {
      resultIndex = (sampleIndex + k) % N;
      resultChar = CHARACTER_SET[resultIndex];
      operationText = `(${sampleIndex} + ${k}) mod ${N} = ${resultIndex}`;
    } else {
      resultIndex = (sampleIndex - k + N) % N;
      resultChar = CHARACTER_SET[resultIndex];
      operationText = `(${sampleIndex} - ${k} + ${N}) mod ${N} = ${resultIndex}`;
    }
  }

  const dynamicNodes: Node[] = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: 'Mulai' }, type: 'input', style: { background: '#dcfce7', borderColor: '#16a34a', color: '#14532d', fontWeight: 600 } },
    { id: '2', position: { x: 250, y: 80 }, data: { label: `Input Pesan:\n"${mode === 'encrypt' ? plaintext || 'Kosong' : ciphertext || 'Kosong'}"` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '3', position: { x: 250, y: 160 }, data: { label: `Input Kunci (k):\n${k}` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '4', position: { x: 250, y: 240 }, data: { label: `Ambil Karakter Pertama:\n'${sampleChar || '-'}'` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '5', position: { x: 250, y: 320 }, data: { label: `Cari Indeks Asli:\n${sampleIndex !== -1 ? sampleIndex : '-'}` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '6', position: { x: 250, y: 400 }, data: { label: `Operasi:\n${sampleIndex !== -1 ? operationText : '-'}` }, style: { backgroundColor: '#dbeafe', borderColor: '#2563eb', color: '#1e3a8a', fontWeight: 600 } },
    { id: '7', position: { x: 250, y: 480 }, data: { label: `Karakter Hasil:\n'${sampleIndex !== -1 ? resultChar : '-'}'` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '8', position: { x: 250, y: 560 }, data: { label: `Ulangi untuk karakter selanjutnya...` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '9', position: { x: 250, y: 640 }, data: { label: `Hasil Akhir:\n"${mode === 'encrypt' ? ciphertext || 'Kosong' : plaintext || 'Kosong'}"` }, style: { background: '#f8fafc', borderColor: '#94a3b8', color: '#1e293b' } },
    { id: '10', position: { x: 250, y: 720 }, data: { label: 'Selesai' }, type: 'output', style: { background: '#fee2e2', borderColor: '#dc2626', color: '#7f1d1d', fontWeight: 600 } },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e2-3', source: '2', target: '3', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e3-4', source: '3', target: '4', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e4-5', source: '4', target: '5', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e5-6', source: '5', target: '6', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563eb' } },
    { id: 'e6-7', source: '6', target: '7', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#2563eb' } },
    { id: 'e7-8', source: '7', target: '8', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e8-9', source: '8', target: '9', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e9-10', source: '9', target: '10', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
    { id: 'e8-4', source: '8', target: '4', type: 'step', label: 'Loop', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#f97316' } },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-primary-600" />
          Flowchart Sistem Berdasarkan Input
        </h2>
        <p className="text-slate-600">
          Diagram alur proses enkripsi/dekripsi secara dinamis mengikuti input yang Anda berikan. Menampilkan simulasi untuk karakter pertama.
        </p>
      </div>

      <Card className="h-[600px] w-full p-0 overflow-hidden relative">
        <ReactFlow
          nodes={dynamicNodes}
          edges={initialEdges}
          fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'input': return '#16a34a';
                case 'output': return '#dc2626';
                default: return '#2563eb';
              }
            }} 
            nodeStrokeWidth={3}
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
          />
          <Background color="#cbd5e1" gap={16} />
        </ReactFlow>
      </Card>
    </div>
  );
};
