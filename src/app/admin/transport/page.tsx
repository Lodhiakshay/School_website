'use client';

import React, { useState, useEffect } from 'react';
import { Bus } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TransportAdminPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/transport/vehicles').then((res) => {
      setVehicles(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bus className="w-6 h-6 text-blue-600" /> Transportation &amp; Fleet
        </h1>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3">Reg. Number</th>
                  <th className="p-3">Vehicle Model</th>
                  <th className="p-3">Driver</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {vehicles.map((v) => (
                  <tr key={v._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{v.registrationNumber}</td>
                    <td className="p-3">{v.vehicleModel} ({v.capacity} Seats)</td>
                    <td className="p-3 font-bold">{v.driverName} ({v.driverPhone})</td>
                    <td className="p-3"><Badge size="sm" variant="success">{v.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
