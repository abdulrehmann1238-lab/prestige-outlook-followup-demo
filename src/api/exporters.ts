import { Contact } from '../data/seed';

export function exportContactsToCsv(contacts: Contact[], filename = 'cedar_contacts_export.csv') {
  const headers = [
    'Business Name',
    'Contact Name',
    'Email',
    'Group',
    'Status',
    'City',
    'State',
    'Phone',
    'Last Order Date',
    'Follow-ups Sent',
    'Replied',
    'Next Follow-up',
    'Assigned Rep',
  ];

  const rows = contacts.map((c) => [
    `"${(c.business || '').replace(/"/g, '""')}"`,
    `"${(c.contactName || '').replace(/"/g, '""')}"`,
    `"${c.email || ''}"`,
    c.group,
    c.status,
    `"${c.city}"`,
    c.state,
    `"${c.phone || ''}"`,
    c.lastOrder || 'N/A',
    `${c.followUpsSent} of ${c.followUpsMax}`,
    c.replied ? 'Yes' : 'No',
    c.nextFollowUp || 'None scheduled',
    c.repId,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportContactsToExcel(contacts: Contact[], filename = 'cedar_contacts_export.xlsx') {
  // Lazy-load XLSX only on first export per PRD Section 14
  const XLSX = await import('xlsx');

  const data = contacts.map((c) => ({
    'Business Name': c.business,
    'Contact Name': c.contactName || '',
    'Email Address': c.email || '',
    'Group': `Group ${c.group}`,
    'Status': c.status,
    'City': c.city,
    'State': c.state,
    'Phone': c.phone || '',
    'Last Order Date': c.lastOrder || '',
    'Follow-ups Sent': `${c.followUpsSent} / ${c.followUpsMax}`,
    'Replied': c.replied ? 'Yes' : 'No',
    'Next Follow-up': c.nextFollowUp || '',
    'Sales Rep': c.repId.toUpperCase(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Cedar Contacts');
  XLSX.writeFile(workbook, filename);
}
