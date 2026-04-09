// ─── Warehouses ──────────────────────────────────────────────────────────────
export const warehouses = [
  { id: 'WH-01', name: 'Main Warehouse', city: 'Riyadh', region: 'Central', capacity: 500000, used: 342000 },
  { id: 'WH-02', name: 'West Hub', city: 'Jeddah', region: 'Western', capacity: 250000, used: 198000 },
  { id: 'WH-03', name: 'East Hub', city: 'Dammam', region: 'Eastern', capacity: 180000, used: 97000 },
];

// ─── Outlets ─────────────────────────────────────────────────────────────────
export const outlets = [
  { id: 'OUT-001', name: 'Olaya Branch', city: 'Riyadh', region: 'Central', type: 'Retail', status: 'critical' },
  { id: 'OUT-002', name: 'Tahlia Street', city: 'Riyadh', region: 'Central', type: 'Retail', status: 'warning' },
  { id: 'OUT-003', name: 'Al-Nakheel Mall', city: 'Riyadh', region: 'Central', type: 'Mall Kiosk', status: 'good' },
  { id: 'OUT-004', name: 'Corniche Branch', city: 'Jeddah', region: 'Western', type: 'Retail', status: 'critical' },
  { id: 'OUT-005', name: 'Al-Balad', city: 'Jeddah', region: 'Western', type: 'Retail', status: 'good' },
  { id: 'OUT-006', name: 'Red Sea Mall', city: 'Jeddah', region: 'Western', type: 'Mall Kiosk', status: 'warning' },
  { id: 'OUT-007', name: 'Dhahran Mall', city: 'Dammam', region: 'Eastern', type: 'Mall Kiosk', status: 'good' },
  { id: 'OUT-008', name: 'Al-Khobar Main', city: 'Al-Khobar', region: 'Eastern', type: 'Retail', status: 'warning' },
];

// ─── Products / SKUs ─────────────────────────────────────────────────────────
export const products = [
  { sku: 'SIM-V-001', name: 'Voice SIM (Prepaid)', category: 'SIM Cards', type: 'voice', unitCost: 5 },
  { sku: 'SIM-V-002', name: 'Voice SIM (Postpaid)', category: 'SIM Cards', type: 'voice', unitCost: 5 },
  { sku: 'SIM-D-001', name: 'Data SIM (4G)', category: 'SIM Cards', type: 'data', unitCost: 8 },
  { sku: 'SIM-D-002', name: 'Data SIM (5G)', category: 'SIM Cards', type: 'data', unitCost: 12 },
  { sku: 'SIM-M2M-001', name: 'M2M IoT SIM', category: 'SIM Cards', type: 'm2m', unitCost: 15 },
  { sku: 'DEV-R-001', name: 'Mobily Router (4G)', category: 'Devices', type: 'device', unitCost: 350 },
  { sku: 'DEV-R-002', name: 'Mobily Router (5G)', category: 'Devices', type: 'device', unitCost: 650 },
  { sku: 'ACC-001', name: 'SIM Adapter Kit', category: 'Accessories', type: 'accessory', unitCost: 12 },
];

// ─── Stock Levels ─────────────────────────────────────────────────────────────
export const stockLevels = [
  // Main Warehouse
  { warehouseId: 'WH-01', sku: 'SIM-V-001', qty: 85000, reorderPoint: 20000, maxCapacity: 120000 },
  { warehouseId: 'WH-01', sku: 'SIM-V-002', qty: 42000, reorderPoint: 15000, maxCapacity: 80000 },
  { warehouseId: 'WH-01', sku: 'SIM-D-001', qty: 38000, reorderPoint: 15000, maxCapacity: 70000 },
  { warehouseId: 'WH-01', sku: 'SIM-D-002', qty: 12000, reorderPoint: 8000, maxCapacity: 40000 },
  { warehouseId: 'WH-01', sku: 'SIM-M2M-001', qty: 22000, reorderPoint: 5000, maxCapacity: 30000 },
  { warehouseId: 'WH-01', sku: 'DEV-R-001', qty: 1200, reorderPoint: 300, maxCapacity: 3000 },
  { warehouseId: 'WH-01', sku: 'DEV-R-002', qty: 680, reorderPoint: 200, maxCapacity: 2000 },
  // West Hub
  { warehouseId: 'WH-02', sku: 'SIM-V-001', qty: 32000, reorderPoint: 10000, maxCapacity: 60000 },
  { warehouseId: 'WH-02', sku: 'SIM-D-001', qty: 6200, reorderPoint: 8000, maxCapacity: 35000 },  // below reorder!
  { warehouseId: 'WH-02', sku: 'DEV-R-001', qty: 210, reorderPoint: 150, maxCapacity: 800 },
  // East Hub
  { warehouseId: 'WH-03', sku: 'SIM-V-001', qty: 28000, reorderPoint: 8000, maxCapacity: 45000 },
  { warehouseId: 'WH-03', sku: 'SIM-D-002', qty: 3100, reorderPoint: 4000, maxCapacity: 15000 },  // below reorder!
];

// ─── Outlet Stock ─────────────────────────────────────────────────────────────
export const outletStock = [
  { outletId: 'OUT-001', sku: 'SIM-V-001', qty: 120, dailySales: 85, reorderPoint: 200 },
  { outletId: 'OUT-001', sku: 'SIM-D-001', qty: 45, dailySales: 62, reorderPoint: 100 },
  { outletId: 'OUT-002', sku: 'SIM-V-001', qty: 380, dailySales: 45, reorderPoint: 200 },
  { outletId: 'OUT-002', sku: 'SIM-D-002', qty: 62, dailySales: 70, reorderPoint: 150 },
  { outletId: 'OUT-004', sku: 'SIM-V-001', qty: 88, dailySales: 95, reorderPoint: 200 },
  { outletId: 'OUT-004', sku: 'SIM-D-001', qty: 22, dailySales: 50, reorderPoint: 100 },
  { outletId: 'OUT-006', sku: 'SIM-D-002', qty: 190, dailySales: 60, reorderPoint: 150 },
  { outletId: 'OUT-008', sku: 'DEV-R-001', qty: 8, dailySales: 6, reorderPoint: 20 },
];

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orders = [
  { id: 'SO-20260001', type: 'Sales Order', from: 'WH-01', to: 'PARTNER-STC', qty: 5000, sku: 'SIM-V-001', status: 'Processing', date: '2026-04-07', value: 25000 },
  { id: 'SO-20260002', type: 'Sales Order', from: 'WH-01', to: 'PARTNER-EXP', qty: 2000, sku: 'SIM-D-001', status: 'Shipped', date: '2026-04-06', value: 16000 },
  { id: 'TO-20260001', type: 'Transfer Order', from: 'WH-01', to: 'OUT-001', qty: 500, sku: 'SIM-V-001', status: 'Pending', date: '2026-04-08', value: 2500 },
  { id: 'TO-20260002', type: 'Transfer Order', from: 'WH-02', to: 'OUT-004', qty: 300, sku: 'SIM-D-001', status: 'In Transit', date: '2026-04-07', value: 2400 },
  { id: 'TO-20260003', type: 'Transfer Order', from: 'OUT-003', to: 'OUT-001', qty: 150, sku: 'SIM-V-001', status: 'Pending', date: '2026-04-08', value: 750 },
  { id: 'RO-20260001', type: 'Return Order', from: 'PARTNER-EXP', to: 'WH-01', qty: 200, sku: 'SIM-V-002', status: 'Received', date: '2026-04-05', value: 1000 },
  { id: 'PO-20260001', type: 'Purchase Order', from: 'VENDOR-SIMCO', to: 'WH-01', qty: 100000, sku: 'SIM-V-001', status: 'Pending Approval', date: '2026-04-08', value: 500000 },
  { id: 'PO-20260002', type: 'Purchase Order', from: 'VENDOR-TECHX', to: 'WH-01', qty: 500, sku: 'DEV-R-002', status: 'Approved', date: '2026-04-06', value: 325000 },
];

// ─── AI Recommendations ───────────────────────────────────────────────────────
export const aiRecommendations = [
  {
    id: 'REC-001',
    type: 'replenishment',
    priority: 'critical',
    title: 'Outlet OUT-001 critically low on Voice SIMs',
    description: 'Olaya Branch has 1.4 days of stock remaining for Voice SIM (Prepaid) based on current daily sales velocity of 85 units.',
    action: 'Transfer 1,000 units from WH-01 → OUT-001',
    impact: 'Prevents stockout within 36 hours',
    potentialLoss: 'SAR 72,250 in missed sales',
    status: 'pending',
    confidence: 97,
  },
  {
    id: 'REC-002',
    type: 'replenishment',
    priority: 'critical',
    title: 'Jeddah Corniche critically low on Voice & Data SIMs',
    description: 'OUT-004 has less than 24 hours of stock for both Voice SIM and Data SIM (4G). Highest-traffic outlet in Western region.',
    action: 'Transfer 800 units Voice SIM + 400 units Data SIM from WH-02 → OUT-004',
    impact: 'Prevents complete stockout in under 24 hours',
    potentialLoss: 'SAR 54,800 in missed sales',
    status: 'pending',
    confidence: 99,
  },
  {
    id: 'REC-003',
    type: 'purchase_order',
    priority: 'high',
    title: 'West Hub below reorder threshold for Data SIM (4G)',
    description: 'WH-02 stock for SIM-D-001 is at 6,200 units, below the reorder point of 8,000. Average lead time from VENDOR-SIMCO is 7 days.',
    action: 'Create PO for 30,000 units of SIM-D-001 from VENDOR-SIMCO',
    impact: 'Replenishes WH-02 before stockout risk materialises',
    potentialLoss: 'SAR 240,000 in potential downstream impact',
    status: 'pending',
    confidence: 92,
  },
  {
    id: 'REC-004',
    type: 'purchase_order',
    priority: 'high',
    title: 'East Hub below reorder for Data SIM (5G)',
    description: 'WH-03 has 3,100 units of SIM-D-002 against a reorder point of 4,000. 5G demand in Eastern region has grown 34% QoQ.',
    action: 'Create PO for 15,000 units of SIM-D-002 from VENDOR-TECHX',
    impact: 'Covers 45-day demand + safety stock buffer',
    potentialLoss: 'SAR 186,000 in potential downstream impact',
    status: 'pending',
    confidence: 88,
  },
  {
    id: 'REC-005',
    type: 'transfer',
    priority: 'medium',
    title: 'Rebalance 5G router stock between hubs',
    description: 'WH-01 has 680 units of DEV-R-002 while WH-03 has 0. Eastern region has 3 pending partner orders for this device.',
    action: 'Transfer 200 units of DEV-R-002 from WH-01 → WH-03',
    impact: 'Fulfils pending partner orders, improves regional coverage',
    potentialLoss: 'SAR 130,000 in delayed partner fulfilment',
    status: 'approved',
    confidence: 95,
  },
  {
    id: 'REC-006',
    type: 'replenishment',
    priority: 'medium',
    title: 'Al-Khobar router stock below safety buffer',
    description: 'OUT-008 has 8 units of DEV-R-001 against a daily sales rate of 6. Only 1.3 days of coverage remaining.',
    action: 'Transfer 30 units of DEV-R-001 from WH-03 → OUT-008',
    impact: 'Restores 5-day buffer at current sales velocity',
    potentialLoss: 'SAR 21,000 in missed device sales',
    status: 'pending',
    confidence: 85,
  },
  {
    id: 'REC-007',
    type: 'purchase_order',
    priority: 'medium',
    title: 'Upcoming spike in M2M IoT demand (Eastern Region)',
    description: 'B2B sales forecast indicates 14% increase in M2M IoT SIM requests next month from Aramco contractors. WH-03 current stock covers only 18 days.',
    action: 'Create PO for 50,000 units of SIM-M2M-001 from VENDOR-TECHX',
    impact: 'Prevents B2B contract penalty risks',
    potentialLoss: 'SAR 450,000 in B2B SLA penalties',
    status: 'pending',
    confidence: 89,
  },
  {
    id: 'REC-008',
    type: 'transfer',
    priority: 'high',
    title: 'Pre-emptive rebalance for Postpaid Voice SIMs',
    description: 'WH-01 is holding 68% of national Postpaid Voice SIM inventory while WH-02 is nearing its reorder threshold due to strong Jeddah seasonal activation rates.',
    action: 'Transfer 15,000 units of SIM-V-002 from WH-01 → WH-02',
    impact: 'Rebalances stock securely without external PO costs',
    potentialLoss: 'SAR 85,000 in delayed customer activation latency',
    status: 'pending',
    confidence: 96,
  },
  {
    id: 'REC-009',
    type: 'replenishment',
    priority: 'critical',
    title: 'Red Sea Mall running empty on 5G Routers',
    description: 'OUT-006 has sold 42 units of DEV-R-002 this week. Stock will deplete entirely by tomorrow morning 11:00 AM.',
    action: 'Expedited Transfer 80 units of DEV-R-002 from WH-02 → OUT-006',
    impact: 'Ensures no weekend stockouts during peak mall hours',
    potentialLoss: 'SAR 52,000 in high-margin device sales',
    status: 'pending',
    confidence: 99,
  },
  {
    id: 'REC-010',
    type: 'purchase_order',
    priority: 'medium',
    title: 'Replenish Data SIM (5G) to capture Hajj season uplift',
    description: 'Historical trend analysis flags immediate need to buff national Data SIM (5G) reserves ahead of Hajj visa issuances.',
    action: 'Create PO for 120,000 units of SIM-D-002 from VENDOR-SIMCO',
    impact: 'Secures high-season tourism revenue capture',
    potentialLoss: 'SAR 1.2M in seasonal roaming/data sales',
    status: 'pending',
    confidence: 93,
  },
];

// ─── MSISDN Number Pool ───────────────────────────────────────────────────────
export const msisdnPools = [
  { type: 'Voice (Prepaid)', total: 2500000, allocated: 1842000, reserved: 120000, color: '#22c55e' },
  { type: 'Voice (Postpaid)', total: 800000, allocated: 612000, reserved: 45000, color: '#3b82f6' },
  { type: 'Data SIM', total: 600000, allocated: 498000, reserved: 30000, color: '#a855f7' },
  { type: 'M2M / IoT', total: 1200000, allocated: 380000, reserved: 200000, color: '#f59e0b' },
  { type: 'Short Codes', total: 5000, allocated: 3800, reserved: 200, color: '#ef4444' },
];

// ─── Sales Trend (last 12 months) ────────────────────────────────────────────
export const salesTrend = [
  { month: 'May', voiceSIM: 42000, dataSIM: 28000, devices: 820 },
  { month: 'Jun', voiceSIM: 45000, dataSIM: 31000, devices: 950 },
  { month: 'Jul', voiceSIM: 51000, dataSIM: 34000, devices: 1100 },
  { month: 'Aug', voiceSIM: 48000, dataSIM: 36000, devices: 1050 },
  { month: 'Sep', voiceSIM: 52000, dataSIM: 40000, devices: 1200 },
  { month: 'Oct', voiceSIM: 58000, dataSIM: 43000, devices: 1380 },
  { month: 'Nov', voiceSIM: 65000, dataSIM: 48000, devices: 1620 },
  { month: 'Dec', voiceSIM: 72000, dataSIM: 54000, devices: 1900 },
  { month: 'Jan', voiceSIM: 61000, dataSIM: 49000, devices: 1450 },
  { month: 'Feb', voiceSIM: 59000, dataSIM: 51000, devices: 1520 },
  { month: 'Mar', voiceSIM: 63000, dataSIM: 55000, devices: 1680 },
  { month: 'Apr', voiceSIM: 66000, dataSIM: 58000, devices: 1750 },
];

// ─── ROI Metrics ─────────────────────────────────────────────────────────────
export const roiMetrics = {
  manualHoursPerWeek: 142,
  automatedHoursPerWeek: 38,
  hoursSaved: 104,
  fteSaved: 2.6,
  stockoutsAvoided: 18,
  stockoutValueSaved: 1242000,
  poSuggestionsApproved: 34,
  poSuggestionsTotal: 37,
  approvalRate: 92,
  avgTimeToApprove: '8 minutes',
  avgTimeBefore: '2.4 days',
};

// ─── KPIs ─────────────────────────────────────────────────────────────────────
export const kpis = {
  activeOrders: 847,
  pendingApprovals: 6,
  criticalAlerts: 3,
  outletsMonitored: 47,
  warehouseFillRate: 76.2,
  todaySales: 8432,
  weeklyRevenue: 4280000,
  stockoutsThisMonth: 2,
};
