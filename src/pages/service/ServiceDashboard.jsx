import { useState } from 'react';
import { 
  CheckCircle, ChevronRight, ChevronLeft, Package, Activity, 
  Wrench, Layers, Truck, Plus, Trash2 
} from 'lucide-react';

export default function ServiceDashboard() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Receiving', icon: Package },
    { title: 'Diagnostics', icon: Activity },
    { title: 'Decision', icon: Wrench },
    { title: 'Spares', icon: Layers },
    { title: 'QC & Dispatch', icon: Truck },
  ];

  const ACCESSORY_OPTIONS = ['Remote', 'Power Cable', 'Manual', 'Original Box', 'Wall Mount'];
  const COMPONENT_OPTIONS = ['IGBT module', 'Capacitors', 'Control board', 'Cooling fan', 'Power module'];

  const [formData, setFormData] = useState({
    ticketId: '',
    dateReceived: new Date().toISOString().split('T')[0],
    receivedBy: '',
    condition: '',
    accessories: [],
    
    diagnosisDate: '',
    diagnosedBy: '',
    errorCode: '',
    faultIdentified: '',
    rootCause: '',
    
    jobCardId: `JC-${Math.floor(10000 + Math.random() * 90000)}`,
    repairStart: '',
    repairCompletion: '',
    repairNotes: '',
    
    isRepairable: true,
    nonRepairReason: '',
    notifyCustomer: false,
    replacementRecommendation: '',
    
    spares: [],
    
    finalTesting: false,
    testEngineer: '',
    testResult: 'Pass',
    qcRemarks: '',
    
    packingCompleted: false,
    packingMaterial: '',
    dispatchDate: '',
    courierName: '',
    trackingNumber: ''
  });

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const toggleAccessory = (acc) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.includes(acc) 
        ? prev.accessories.filter(a => a !== acc)
        : [...prev.accessories, acc]
    }));
  };

  const addSpare = () => {
    setFormData(prev => ({
      ...prev,
      spares: [...prev.spares, { id: Date.now(), component: '', partNumber: '', quantity: 1, issuedFromStore: false, engineerName: '', dateUsed: '' }]
    }));
  };

  const updateSpare = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      spares: prev.spares.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const removeSpare = (id) => {
    setFormData(prev => ({
      ...prev,
      spares: prev.spares.filter(s => s.id !== id)
    }));
  };

  const handleNext = () => setActiveStep(p => Math.min(p + 1, steps.length - 1));
  const handlePrev = () => setActiveStep(p => Math.max(p - 1, 0));

  // --- Step Components ---

  const StepReceiving = () => (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-slate-800 border-b pb-2">6.2 Receiving Section</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ticket ID (Searchable)</label>
          <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" placeholder="e.g. TKT-1234" value={formData.ticketId} onChange={e => updateForm('ticketId', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date Received</label>
          <input type="date" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.dateReceived} onChange={e => updateForm('dateReceived', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Received By</label>
          <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.receivedBy} onChange={e => updateForm('receivedBy', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Condition of Unit</label>
          <textarea rows={3} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" placeholder="Describe scratches, dents, or visual damage..." value={formData.condition} onChange={e => updateForm('condition', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Accessories Received</label>
          <div className="flex flex-wrap gap-2">
            {ACCESSORY_OPTIONS.map(acc => (
              <button 
                key={acc} onClick={() => toggleAccessory(acc)} 
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${formData.accessories.includes(acc) ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const StepDiagnostics = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-6">6.3 Diagnostic View</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosis Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.diagnosisDate} onChange={e => updateForm('diagnosisDate', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosed By</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.diagnosedBy} onChange={e => updateForm('diagnosedBy', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Error Code</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" placeholder="e.g. ERR-02" value={formData.errorCode} onChange={e => updateForm('errorCode', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Root Cause</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" placeholder="e.g. Surge protection failed" value={formData.rootCause} onChange={e => updateForm('rootCause', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Fault Identified</label>
            <textarea rows={2} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.faultIdentified} onChange={e => updateForm('faultIdentified', e.target.value)} />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-6">6.4 Job Card</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Job Card ID</label>
            <input type="text" disabled className="w-full px-4 py-2 border rounded-xl bg-slate-100 font-mono text-slate-600" value={formData.jobCardId} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Repair Start Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.repairStart} onChange={e => updateForm('repairStart', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Repair Completion Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" value={formData.repairCompletion} onChange={e => updateForm('repairCompletion', e.target.value)} />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Repair Notes (Rich Text)</label>
            <textarea rows={4} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500" placeholder="Detail the repair process here..." value={formData.repairNotes} onChange={e => updateForm('repairNotes', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );

  const StepDecision = () => (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-slate-800 border-b pb-2">6.5 Repair Decision Logic</h3>
      
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => updateForm('isRepairable', true)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${formData.isRepairable ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
        >
          Repairable
        </button>
        <button 
          onClick={() => updateForm('isRepairable', false)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${!formData.isRepairable ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
        >
          Non-Repairable
        </button>
      </div>

      {!formData.isRepairable && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl space-y-4 animate-fade-in-up">
          <div>
            <label className="block text-sm font-medium text-red-900 mb-1">Reason for Non-Repairable</label>
            <textarea rows={2} className="w-full px-4 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500" value={formData.nonRepairReason} onChange={e => updateForm('nonRepairReason', e.target.value)} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="notifyCust" className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500" checked={formData.notifyCustomer} onChange={e => updateForm('notifyCustomer', e.target.checked)} />
            <label htmlFor="notifyCust" className="ml-3 block text-sm font-medium text-red-900">Notify Customer regarding replacement</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-red-900 mb-1">Replacement Recommendation</label>
            <input type="text" placeholder="e.g. Upgrade to SolarMax 5000" className="w-full px-4 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500" value={formData.replacementRecommendation} onChange={e => updateForm('replacementRecommendation', e.target.value)} />
          </div>
        </div>
      )}
      {formData.isRepairable && (
        <div className="p-6 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center">
          <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
          <p className="font-medium">Unit is marked repairable. You can proceed to Spare Parts Consumption.</p>
        </div>
      )}
    </div>
  );

  const StepSpares = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-xl font-bold text-slate-800">6.6 Spare Parts Consumption</h3>
        <button onClick={addSpare} className="flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add Part
        </button>
      </div>

      {formData.spares.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <Layers className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No spare parts added yet. Click "Add Part" to record consumption.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider">
                <th className="p-3 rounded-tl-xl font-semibold">Component</th>
                <th className="p-3 font-semibold">Part Number</th>
                <th className="p-3 font-semibold">Qty</th>
                <th className="p-3 font-semibold">Issued From Store</th>
                <th className="p-3 font-semibold">Used By</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 rounded-tr-xl"></th>
              </tr>
            </thead>
            <tbody>
              {formData.spares.map(s => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="p-2">
                    <select className="w-full p-2 bg-white border rounded-lg focus:ring-2 focus:ring-brand-500" value={s.component} onChange={e => updateSpare(s.id, 'component', e.target.value)}>
                      <option value="">Select...</option>
                      {COMPONENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                  <td className="p-2"><input type="text" className="w-full p-2 bg-white border rounded-lg" value={s.partNumber} onChange={e => updateSpare(s.id, 'partNumber', e.target.value)} /></td>
                  <td className="p-2 w-20"><input type="number" min="1" className="w-full p-2 bg-white border rounded-lg" value={s.quantity} onChange={e => updateSpare(s.id, 'quantity', e.target.value)} /></td>
                  <td className="p-2 text-center">
                    <input type="checkbox" className="w-5 h-5 text-brand-500 rounded focus:ring-brand-500" checked={s.issuedFromStore} onChange={e => updateSpare(s.id, 'issuedFromStore', e.target.checked)} />
                  </td>
                  <td className="p-2"><input type="text" className="w-full p-2 bg-white border rounded-lg" value={s.engineerName} onChange={e => updateSpare(s.id, 'engineerName', e.target.value)} /></td>
                  <td className="p-2"><input type="date" className="w-full p-2 bg-white border rounded-lg text-sm" value={s.dateUsed} onChange={e => updateSpare(s.id, 'dateUsed', e.target.value)} /></td>
                  <td className="p-2 text-right">
                    <button onClick={() => removeSpare(s.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const StepQC = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-6">6.7 Quality Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl">
            <input type="checkbox" id="finalTest" className="w-5 h-5 rounded text-brand-500" checked={formData.finalTesting} onChange={e => updateForm('finalTesting', e.target.checked)} />
            <label htmlFor="finalTest" className="font-medium text-slate-700">Final Testing Completed</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Test Engineer</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.testEngineer} onChange={e => updateForm('testEngineer', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Test Result</label>
            <select className="w-full px-4 py-2 border rounded-xl" value={formData.testResult} onChange={e => updateForm('testResult', e.target.value)}>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
              <option value="Hold">Hold / Needs Review</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">QC Remarks</label>
            <textarea rows={2} className="w-full px-4 py-2 border rounded-xl" value={formData.qcRemarks} onChange={e => updateForm('qcRemarks', e.target.value)} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-6">6.8 Dispatch Prep</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl">
            <input type="checkbox" id="packComp" className="w-5 h-5 rounded text-brand-500" checked={formData.packingCompleted} onChange={e => updateForm('packingCompleted', e.target.checked)} />
            <label htmlFor="packComp" className="font-medium text-slate-700">Packing Completed</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Packing Material Used</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Foam + Corrugated box" value={formData.packingMaterial} onChange={e => updateForm('packingMaterial', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dispatch Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-xl" value={formData.dispatchDate} onChange={e => updateForm('dispatchDate', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Courier Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.courierName} onChange={e => updateForm('courierName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tracking Number</label>
            <input type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.trackingNumber} onChange={e => updateForm('trackingNumber', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12 shadow-sm rounded-2xl bg-white border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-6 md:px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <h1 className="text-2xl font-bold relative z-10 flex items-center">
          <Wrench className="w-6 h-6 mr-3 text-brand-400" />
          Service & Maintenance Dashboard
        </h1>
        <p className="text-slate-400 mt-2 text-sm relative z-10">Streamlined workflow for processing incoming repairs</p>
      </div>

      {/* Stepper Header */}
      <div className="border-b bg-slate-50 px-6 md:px-8 py-4 overflow-x-auto">
        <div className="flex justify-between items-center min-w-[600px]">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            
            return (
              <div key={step.title} className="flex flex-col items-center relative flex-1">
                {/* Connecting Line */}
                {index !== 0 && (
                  <div className={`absolute top-5 left-0 w-full h-1 -translate-x-1/2 -z-10 transition-colors duration-500 ${isCompleted ? 'bg-brand-500' : 'bg-slate-200'}`} />
                )}
                
                <div onClick={() => setActiveStep(index)} className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${isActive ? 'bg-brand-500 text-white ring-4 ring-brand-100' : isCompleted ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {isCompleted && !isActive ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`mt-2 text-xs font-semibold ${isActive ? 'text-brand-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 min-h-[400px]">
        {activeStep === 0 && <StepReceiving />}
        {activeStep === 1 && <StepDiagnostics />}
        {activeStep === 2 && <StepDecision />}
        {activeStep === 3 && <StepSpares />}
        {activeStep === 4 && <StepQC />}
      </div>

      {/* Footer Navigation */}
      <div className="px-6 md:px-8 py-5 border-t bg-slate-50 flex justify-between items-center">
        <button 
          onClick={handlePrev} 
          disabled={activeStep === 0}
          className="flex items-center px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>
        
        {activeStep < steps.length - 1 ? (
          <button 
            onClick={handleNext}
            className="flex items-center px-6 py-2.5 rounded-xl font-semibold bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all"
          >
            Next Step <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        ) : (
          <button 
            onClick={() => alert('Service record saved successfully!')}
            className="flex items-center px-8 py-2.5 rounded-xl font-semibold bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all"
          >
            Save Record <CheckCircle className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
