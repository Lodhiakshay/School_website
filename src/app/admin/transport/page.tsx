'use client';

import React, { useState, useEffect } from 'react';
import {
  Bus,
  Plus,
  MapPin,
  Phone,
  ShieldCheck,
  Navigation,
  Printer,
  Users,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackVehicles = [
  {
    _id: 'v_01',
    routeNumber: 'Route 1 - Shamsabad North',
    registrationNumber: 'UP-76-AT-1089',
    vehicleModel: 'Tata Starbus 42-Seater',
    capacity: 42,
    driverName: 'Shri Ramakant Yadav',
    driverPhone: '+91 9451234701',
    conductorName: 'Suraj Kumar',
    status: 'active',
    gpsStatus: 'Online (Moving)',
    currentSpeed: '32 km/h',
    stops: ['Near Bus Stand', 'Police Chowki', 'Katra Bazar', 'Ghosampura', 'School Campus'],
    enrolledStudents: 38,
  },
  {
    _id: 'v_02',
    routeNumber: 'Route 2 - Farrukhabad City Highway',
    registrationNumber: 'UP-76-AT-1090',
    vehicleModel: 'Eicher Skyline Pro 32-Seater',
    capacity: 32,
    driverName: 'Shri Manoj Kumar Sharma',
    driverPhone: '+91 9451234702',
    conductorName: 'Dheeraj Singh',
    status: 'active',
    gpsStatus: 'Online (Stationary)',
    currentSpeed: '0 km/h',
    stops: ['Fatehgarh Crossing', 'Bholepur', 'Central Jail Road', 'Rajepur', 'School Campus'],
    enrolledStudents: 29,
  },
  {
    _id: 'v_03',
    routeNumber: 'Route 3 - Kaimganj Bypass',
    registrationNumber: 'UP-76-BT-2045',
    vehicleModel: 'Ashok Leyland Sunshine 50-Seater',
    capacity: 50,
    driverName: 'Shri Arvind Pal',
    driverPhone: '+91 9451234703',
    conductorName: 'Rameshwar Dayal',
    status: 'active',
    gpsStatus: 'Online (Moving)',
    currentSpeed: '28 km/h',
    stops: ['Kaimganj Chauraha', 'Nawabganj Mode', 'Aliganj Road', 'Mundgaon', 'School Campus'],
    enrolledStudents: 46,
  },
  {
    _id: 'v_04',
    routeNumber: 'Route 4 - Mohammadabad Rural Wing',
    registrationNumber: 'UP-76-BT-2046',
    vehicleModel: 'Mahindra Cruzio 28-Seater',
    capacity: 28,
    driverName: 'Shri Suresh Chandra',
    driverPhone: '+91 9451234704',
    conductorName: 'Anil Kumar',
    status: 'active',
    gpsStatus: 'Online (Moving)',
    currentSpeed: '35 km/h',
    stops: ['Mohammadabad Bus Stop', 'Jahanaganj', 'Khairnagar', 'School Campus'],
    enrolledStudents: 24,
  },
];

export default function TransportAdminPage() {
  const [vehicles, setVehicles] = useState<any[]>(fallbackVehicles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const [newVehicle, setNewVehicle] = useState({
    routeNumber: 'Route 5 - Nawabganj Link',
    registrationNumber: 'UP-76-CT-3301',
    vehicleModel: 'Tata Starbus 36-Seater',
    capacity: '36',
    driverName: '',
    driverPhone: '',
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'v_' + Date.now(),
      routeNumber: newVehicle.routeNumber,
      registrationNumber: newVehicle.registrationNumber,
      vehicleModel: newVehicle.vehicleModel,
      capacity: parseInt(newVehicle.capacity) || 36,
      driverName: newVehicle.driverName || 'Shri Rajesh Kumar',
      driverPhone: newVehicle.driverPhone || '+91 9451234799',
      conductorName: 'Assigned Staff',
      status: 'active',
      gpsStatus: 'Online (Active)',
      currentSpeed: '0 km/h',
      stops: ['Town Hall', 'Main Market', 'School Campus'],
      enrolledStudents: 15,
    };
    setVehicles([...vehicles, created]);
    setIsAddModalOpen(false);
    toast.success(`Bus ${created.registrationNumber} (${created.routeNumber}) added to fleet.`, 'Vehicle Registered');
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Bus className="w-5 h-5 text-blue-600" /> Transportation &amp; Fleet Hub
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live GPS tracking, school bus routes, driver rosters, and pickup stops across Farrukhabad district.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Bus Routes list.', 'Route Sheet Ready');
              }}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print Routes
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Quick Fleet Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Buses</span>
            <div className="text-xl font-black text-slate-900 mt-1">4 Active Buses</div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">GPS Tracking</span>
            <div className="text-xl font-black text-emerald-700 mt-1">100% Online</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-sm">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Commuter Scholars</span>
            <div className="text-xl font-black text-blue-700 mt-1">137 Students</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm">
            <span className="text-[10px] font-bold text-amber-700 uppercase">Coverage Area</span>
            <div className="text-xl font-black text-amber-700 mt-1">28 Km Radius</div>
          </div>
        </div>

        {/* Vehicle Route Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {vehicles.map((v) => (
            <Card key={v._id} className="border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900">{v.routeNumber}</h3>
                    <p className="text-[10px] font-mono font-bold text-blue-600">{v.registrationNumber}</p>
                  </div>
                </div>
                <Badge size="sm" variant="success">
                  {v.gpsStatus}
                </Badge>
              </div>

              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[11px]">Assigned Driver:</span>
                    <p className="font-bold text-slate-800">{v.driverName}</p>
                    <p className="text-[10px] font-mono text-slate-500">{v.driverPhone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Fleet Model:</span>
                    <p className="font-bold text-slate-800">{v.vehicleModel}</p>
                    <p className="text-[10px] text-blue-600 font-bold">
                      {v.enrolledStudents} / {v.capacity} Seats Filled
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> Route Pickup Stops:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {v.stops.map((st: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-medium text-slate-700 shadow-sm"
                      >
                        {idx + 1}. {st}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Bus className="w-4 h-4 text-blue-600" /> Add Fleet Vehicle
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
              <Input
                label="Route Name *"
                required
                placeholder="e.g. Route 5 - Nawabganj Link"
                value={newVehicle.routeNumber}
                onChange={(e) => setNewVehicle({ ...newVehicle, routeNumber: e.target.value })}
              />
              <Input
                label="Registration Number *"
                required
                placeholder="e.g. UP-76-CT-3301"
                value={newVehicle.registrationNumber}
                onChange={(e) => setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Driver Name *"
                  required
                  placeholder="e.g. Shri Rajesh Kumar"
                  value={newVehicle.driverName}
                  onChange={(e) => setNewVehicle({ ...newVehicle, driverName: e.target.value })}
                />
                <Input
                  label="Driver Phone"
                  placeholder="+91 9451234799"
                  value={newVehicle.driverPhone}
                  onChange={(e) => setNewVehicle({ ...newVehicle, driverPhone: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-3">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Save Vehicle Route
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
