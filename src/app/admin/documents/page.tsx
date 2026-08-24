'use client';

import React, { useState, useEffect } from 'react';
import { FolderLock } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function DocumentsAdminPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/documents').then((res) => {
      setDocs(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FolderLock className="w-6 h-6 text-blue-600" /> Secure Document Vault
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
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">File Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {docs.map((d) => (
                  <tr key={d._id}>
                    <td className="p-3 font-bold">{d.title}</td>
                    <td className="p-3"><Badge size="sm" variant="info">{d.category}</Badge></td>
                    <td className="p-3 font-mono">{d.fileName}</td>
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
