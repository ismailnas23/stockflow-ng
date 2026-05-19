import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const colors = {
  bg: "#f8f9fa",
  surface: "#ffffff",
  surfaceLow: "#f3f4f5",
  surfaceMid: "#e7e8e9",
  text: "#191c1d",
  muted: "#68717f",
  primary: "#001e40",
  primarySoft: "#003366",
  primaryPale: "#d5e3ff",
  accent: "#83fba5",
  success: "#35b063",
  danger: "#ba1a1a",
  dangerSoft: "#ffdad6"
};

const screens = ["Dashboard", "Sales", "Inventory", "Marketing", "Settings"] as const;

const products = [
  { name: "Braided USB-C Cable", price: "₦2,800", stock: "STOCK: 28", tone: "light" },
  { name: "Fast Charger", price: "₦5,000", stock: "STOCK: 14", tone: "sand" },
  { name: "Privacy Screen Protector", price: "₦3,000", stock: "STOCK: 10", tone: "dark", danger: true },
  { name: "Liquid Silicone Case", price: "₦2,500", stock: "STOCK: 8", tone: "teal", danger: true }
];

export default function App() {
  const [screen, setScreen] = useState<(typeof screens)[number]>("Dashboard");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <Header
          title={
            screen === "Dashboard" ? "Good morning, Ismail 👋" :
            screen === "Sales" ? "Sovereign POS" :
            screen === "Marketing" ? "Smart Flyer Studio" :
            screen
          }
          subtitle={
            screen === "Dashboard" ? "Today's expected profit target: ₦20,000" :
            screen === "Marketing" ? "Professional design hub" :
            screen === "Inventory" ? "Inventory Overview" :
            undefined
          }
        />

        {screen === "Dashboard" ? <DashboardScreen /> : null}
        {screen === "Sales" ? <SalesScreen /> : null}
        {screen === "Inventory" ? <InventoryScreen /> : null}
        {screen === "Marketing" ? <MarketingScreen /> : null}
        {screen === "Settings" ? <SettingsScreen /> : null}
      </ScrollView>

      <View style={styles.tabs}>
        {screens.map((item) => (
          <TouchableOpacity key={item} style={[styles.tab, screen === item && styles.tabActive]} onPress={() => setScreen(item)}>
            <Text style={[styles.tabGlyph, screen === item && styles.tabGlyphActive]}>{item.slice(0, 1)}</Text>
            <Text style={[styles.tabText, screen === item && styles.tabTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconChip}><Text style={styles.iconLabel}>M</Text></TouchableOpacity>
      <View style={styles.headerCopy}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
      <TouchableOpacity style={styles.iconChip}><Text style={styles.iconLabel}>N</Text></TouchableOpacity>
    </View>
  );
}

function DashboardScreen() {
  const cards = [
    ["SALES TODAY", "₦35,000", undefined],
    ["PROFIT TODAY", "₦12,500", "success"],
    ["STOCK VALUE", "₦128,000", undefined],
    ["INVENTORY ALERT", "3 Items", "dark"]
  ] as const;

  return (
    <>
      <View style={styles.grid}>
        {cards.map(([label, value, tone]) => (
          <View key={label} style={[styles.metricCard, tone === "dark" && styles.metricCardDark]}>
            <Text style={[styles.metricLabel, tone === "dark" && styles.metricLabelDark]}>{label}</Text>
            <Text style={[styles.metricValue, tone === "success" && styles.successText, tone === "dark" && styles.metricValueDark]}>{value}</Text>
          </View>
        ))}
      </View>

      <Surface>
        <SectionTitle title="Weekly Sales Trend" subtitle="Performance overview for the last 7 days" />
        <View style={styles.barChart}>
          {[40, 65, 50, 85, 95, 60, 45].map((height, index) => (
            <View key={`${height}-${index}`} style={[styles.bar, { height: `${height}%` }, index === 4 && styles.barActive]} />
          ))}
        </View>
      </Surface>

      <Surface>
        <SectionTitle title="Quick Actions" />
        <View style={styles.actionGrid}>
          {["Add Sale", "Restock", "Create Bundle", "Order Supplier"].map((label) => (
            <TouchableOpacity key={label} style={styles.actionButton}>
              <Text style={styles.actionText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Surface>

      <View style={styles.stack}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Selling Today</Text>
          <Text style={styles.metaText}>View All</Text>
        </View>
        {[
          ["Braided USB-C Cable", "+₦3,600"],
          ["Fast Charger", "+₦4,200"],
          ["Privacy Screen Protector", "+₦2,250"]
        ].map(([name, profit]) => (
          <View key={name} style={styles.listRow}>
            <View>
              <Text style={styles.listTitle}>{name}</Text>
              <Text style={styles.smallMuted}>Net profit</Text>
            </View>
            <Text style={styles.successText}>{profit}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

function SalesScreen() {
  return (
    <>
      <View style={styles.searchShell}>
        <Text style={styles.smallMuted}>S</Text>
        <TextInput placeholder="Search product..." style={styles.searchInput} />
      </View>

      <View style={styles.momentum}>
        <View>
          <Text style={styles.metricLabel}>DAILY MOMENTUM</Text>
          <View style={styles.inlineMetric}>
            <Text style={styles.bigMetric}>₦142,500</Text>
            <Text style={styles.successText}>+12.5%</Text>
          </View>
        </View>
        <View style={styles.sparkline}>
          {[40, 56, 50, 70, 86, 100].map((height, index) => (
            <View key={height} style={[styles.sparkBar, { height: `${height}%` }, index === 5 && styles.sparkBarActive]} />
          ))}
        </View>
      </View>

      <View style={styles.stack}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Inventory</Text>
          <Text style={styles.metaText}>4 items found</Text>
        </View>
        {products.map((product) => (
          <View key={product.name} style={styles.productRow}>
            <View style={[styles.thumb, product.tone === "sand" && styles.thumbSand, product.tone === "dark" && styles.thumbDark, product.tone === "teal" && styles.thumbTeal]} />
            <View style={styles.productMeta}>
              <Text style={styles.listTitle}>{product.name}</Text>
              <View style={styles.inlineMeta}>
                <Text style={styles.successText}>{product.price}</Text>
                <Text style={[styles.smallMuted, product.danger && styles.dangerText]}>{product.stock}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.plusButton}><Text style={styles.plusText}>+</Text></TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.checkoutSheet}>
        <View style={styles.checkoutSummary}>
          <View style={styles.checkoutBox}>
            <Text style={styles.metricLabel}>TOTAL SALES</Text>
            <Text style={styles.checkoutValue}>₦13,300</Text>
          </View>
          <View style={[styles.checkoutBox, styles.checkoutProfitBox]}>
            <Text style={styles.metricLabel}>EST. PROFIT</Text>
            <Text style={[styles.checkoutValue, styles.successText]}>₦4,200</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Save Transaction</Text></TouchableOpacity>
      </View>
    </>
  );
}

function InventoryScreen() {
  return (
    <>
      <View style={styles.grid}>
        {[
          ["TOTAL", "142", undefined],
          ["ALERTS", "5", "danger"],
          ["FAST MOVING", "12", "success"],
          ["SLOW MOVING", "4", undefined]
        ].map(([label, value, tone]) => (
          <View key={label} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{label}</Text>
            <Text style={[styles.metricValue, tone === "danger" && styles.dangerText, tone === "success" && styles.successText]}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.stack}>
        <SectionTitle title="Critical Alerts" />
        <View style={[styles.alertCard, styles.alertDanger]}>
          <Text style={styles.metricLabel}>RESTOCK NEEDED</Text>
          <Text style={styles.listTitle}>Fast chargers below 5 units</Text>
          <Text style={styles.smallMuted}>Restock recommended within 24hrs</Text>
        </View>
      </View>

      <Surface>
        <View style={styles.chips}>
          {["All", "Cables", "Chargers", "Protectors", "Cases"].map((chip, index) => (
            <View key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
            </View>
          ))}
        </View>
      </Surface>

      <View style={styles.stack}>
        {[
          "Braided USB-C Cable • 28 units",
          "20W Fast Wall Adapter • 4 units",
          "Privacy Screen Protector • 18 units"
        ].map((item) => (
          <View key={item} style={styles.listRow}>
            <Text style={styles.listTitle}>{item}</Text>
            <Text style={styles.successText}>View</Text>
          </View>
        ))}
      </View>
    </>
  );
}

function MarketingScreen() {
  return (
    <>
      <View style={styles.heroSurface}>
        <Text style={styles.heroTag}>NEW RELEASE</Text>
        <Text style={styles.heroTitle}>Phone Case Discount Flyer</Text>
        <Text style={styles.heroBody}>Create StockFlow 📱 branded campaigns with your product catalog, colors, and contact details.</Text>
        <View style={styles.flyerCard}>
          <Text style={styles.flyerSale}>FLASH SALE</Text>
          <Text style={styles.flyerName}>Fast Charger</Text>
          <Text style={styles.flyerPrice}>₦4,500</Text>
        </View>
      </View>

      <Surface>
        <SectionTitle title="Connect & Select Platforms" subtitle="Choose where to broadcast your flyer" />
        <View style={styles.platformGrid}>
          {["WhatsApp", "Instagram", "Facebook", "Telegram"].map((item, index) => (
            <View key={item} style={styles.platformCard}>
              {index < 2 ? <View style={styles.platformCheck} /> : null}
              <View style={[styles.platformCircle, index < 2 && styles.platformCircleActive]}><Text style={styles.platformGlyph}>{item.slice(0, 1)}</Text></View>
              <Text style={styles.platformTitle}>{item}</Text>
              <Text style={styles.successLabel}>CONNECTED</Text>
            </View>
          ))}
        </View>
      </Surface>

      <Surface>
        <View style={styles.segmented}>
          <View style={[styles.segment, styles.segmentActive]}><Text style={styles.segmentActiveText}>Post Now</Text></View>
          <View style={styles.segment}><Text style={styles.segmentText}>Schedule</Text></View>
          <View style={styles.segment}><Text style={styles.segmentText}>Draft</Text></View>
        </View>
        <View style={styles.scheduleRow}>
          <View style={styles.scheduleCard}><Text style={styles.listTitle}>24 Oct, 2023</Text><Text style={styles.smallMuted}>Cal</Text></View>
          <View style={styles.scheduleCard}><Text style={styles.listTitle}>10:00 AM</Text><Text style={styles.smallMuted}>Clk</Text></View>
        </View>
      </Surface>

      <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Post to Selected Platforms</Text></TouchableOpacity>
      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.softButton}><Text style={styles.actionText}>Save Flyer</Text></TouchableOpacity>
        <TouchableOpacity style={styles.softButton}><Text style={styles.actionText}>Caption</Text></TouchableOpacity>
      </View>
    </>
  );
}

function SettingsScreen() {
  return (
    <>
      <Surface>
        <View style={styles.profileCard}>
          <View style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Ismail's Accessories</Text>
            <Text style={styles.smallMuted}>ismail.acc@stockflow.ng</Text>
            <Text style={styles.smallMuted}>+234 801 234 5678</Text>
          </View>
          <TouchableOpacity style={styles.iconChip}><Text style={styles.iconLabel}>E</Text></TouchableOpacity>
        </View>
      </Surface>

      <View style={styles.stack}>
        <SectionTitle title="General" />
        {["Store Location • Kano, Nigeria", "Currency • Nigerian Naira"].map((item) => (
          <View key={item} style={styles.listRow}><Text style={styles.listTitle}>{item}</Text></View>
        ))}
      </View>

      <View style={styles.stack}>
        <SectionTitle title="Notifications" />
        {["Supplier Alerts • On", "Stock Alerts • On"].map((item) => (
          <View key={item} style={styles.listRow}><Text style={styles.listTitle}>{item}</Text><Text style={styles.successText}>On</Text></View>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Founder plan • ₦5,000/month</Text></TouchableOpacity>
      <TouchableOpacity style={styles.softButton}><Text style={styles.dangerText}>Logout</Text></TouchableOpacity>
    </>
  );
}

function Surface({ children }: { children: React.ReactNode }) {
  return <View style={styles.surface}>{children}</View>;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.smallMuted}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  page: { padding: 16, paddingBottom: 128, gap: 16, maxWidth: 430, alignSelf: "center", width: "100%" },
  header: { flexDirection: "row", alignItems: "center", gap: 10, paddingBottom: 8 },
  headerCopy: { flex: 1 },
  headerTitle: { color: colors.primary, fontWeight: "800", fontSize: 18, lineHeight: 20 },
  headerSubtitle: { color: colors.muted, fontSize: 12, marginTop: 4 },
  iconChip: { width: 40, height: 40, borderRadius: 999, justifyContent: "center", alignItems: "center" },
  iconLabel: { color: colors.primary, fontWeight: "800" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  metricCard: { width: "48%", minHeight: 112, backgroundColor: colors.surface, borderRadius: 24, padding: 16, justifyContent: "space-between" },
  metricCardDark: { backgroundColor: colors.primarySoft },
  metricLabel: { fontSize: 10, color: colors.muted, fontWeight: "800", letterSpacing: 1.5 },
  metricLabelDark: { color: "#a7c8ff" },
  metricValue: { fontSize: 30, lineHeight: 32, color: colors.primary, fontWeight: "800" },
  metricValueDark: { color: "#fff" },
  successText: { color: colors.success, fontWeight: "800" },
  dangerText: { color: colors.danger, fontWeight: "800" },
  surface: { backgroundColor: colors.surface, borderRadius: 24, padding: 18, gap: 14 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  sectionTitle: { color: "#263140", fontWeight: "800", fontSize: 18 },
  metaText: { color: "#8a92a0", fontSize: 12, fontWeight: "700" },
  stack: { gap: 12 },
  barChart: { height: 110, flexDirection: "row", alignItems: "flex-end", gap: 7 },
  bar: { flex: 1, backgroundColor: "#e1e3e6", borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  barActive: { backgroundColor: colors.primarySoft },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  actionButton: { width: "48%", minHeight: 60, borderRadius: 20, backgroundColor: colors.surfaceLow, justifyContent: "center", alignItems: "center", paddingHorizontal: 10 },
  actionText: { color: colors.primary, fontWeight: "800" },
  listRow: { minHeight: 60, borderRadius: 22, backgroundColor: colors.surface, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", shadowColor: "#001e40", shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
  listTitle: { color: colors.text, fontWeight: "700", flexShrink: 1 },
  smallMuted: { color: "#8a92a0", fontSize: 12, fontWeight: "700" },
  searchShell: { backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: 16, minHeight: 56, flexDirection: "row", alignItems: "center", gap: 10 },
  searchInput: { flex: 1 },
  momentum: { backgroundColor: "#f2f3f4", borderRadius: 24, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  inlineMetric: { flexDirection: "row", alignItems: "baseline", gap: 8, marginTop: 6 },
  bigMetric: { color: colors.primary, fontWeight: "800", fontSize: 30, lineHeight: 32 },
  sparkline: { flexDirection: "row", alignItems: "flex-end", gap: 4, height: 46 },
  sparkBar: { width: 8, backgroundColor: "rgba(131,251,165,0.32)", borderRadius: 999 },
  sparkBarActive: { backgroundColor: colors.accent },
  productRow: { backgroundColor: colors.surface, borderRadius: 22, padding: 12, flexDirection: "row", alignItems: "center", gap: 12, shadowColor: "#001e40", shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
  thumb: { width: 64, height: 64, borderRadius: 16, backgroundColor: "#dce6f4" },
  thumbSand: { backgroundColor: "#d6be97" },
  thumbDark: { backgroundColor: "#1a2232" },
  thumbTeal: { backgroundColor: "#85d1cf" },
  productMeta: { flex: 1 },
  inlineMeta: { flexDirection: "row", alignItems: "baseline", gap: 10, marginTop: 6, flexWrap: "wrap" },
  plusButton: { width: 42, height: 42, borderRadius: 999, backgroundColor: colors.primaryPale, justifyContent: "center", alignItems: "center" },
  plusText: { color: colors.primary, fontSize: 24, lineHeight: 24 },
  checkoutSheet: { backgroundColor: "rgba(255,255,255,0.98)", borderRadius: 28, padding: 14, gap: 12, shadowColor: "#001e40", shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: -6 } },
  checkoutSummary: { flexDirection: "row", gap: 10 },
  checkoutBox: { flex: 1, backgroundColor: "#f2f2f2", borderRadius: 18, padding: 14 },
  checkoutProfitBox: { backgroundColor: "rgba(131,251,165,0.14)" },
  checkoutValue: { color: colors.primary, fontSize: 30, lineHeight: 32, fontWeight: "800", marginTop: 6 },
  primaryButton: { minHeight: 56, borderRadius: 18, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" },
  primaryButtonText: { color: "#fff", fontWeight: "800" },
  alertCard: { borderRadius: 20, padding: 16, gap: 8 },
  alertDanger: { backgroundColor: "rgba(255,218,214,0.45)", borderLeftWidth: 4, borderLeftColor: colors.danger },
  chips: { flexDirection: "row", gap: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: colors.surfaceLow },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.muted, fontWeight: "800" },
  chipTextActive: { color: "#fff" },
  heroSurface: { backgroundColor: colors.primary, borderRadius: 28, padding: 20, gap: 10 },
  heroTag: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.6 },
  heroTitle: { color: "#fff", fontSize: 30, lineHeight: 32, fontWeight: "800" },
  heroBody: { color: "#d5e3ff", fontSize: 14, lineHeight: 20 },
  flyerCard: { backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 22, padding: 16, marginTop: 8 },
  flyerSale: { alignSelf: "flex-start", backgroundColor: colors.accent, color: "#00210c", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, fontSize: 11, fontWeight: "800" },
  flyerName: { marginTop: 12, color: colors.primary, fontSize: 24, fontWeight: "800" },
  flyerPrice: { marginTop: 4, color: colors.primary, fontSize: 30, fontWeight: "800" },
  platformGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  platformCard: { width: "48%", backgroundColor: colors.surface, borderRadius: 22, padding: 16, alignItems: "center", minHeight: 128, position: "relative", shadowColor: "#001e40", shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
  platformCheck: { position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: 999, backgroundColor: colors.success },
  platformCircle: { width: 48, height: 48, borderRadius: 999, backgroundColor: colors.surfaceMid, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  platformCircleActive: { backgroundColor: "rgba(131,251,165,0.28)" },
  platformGlyph: { fontWeight: "800", color: colors.primary },
  platformTitle: { fontWeight: "700", color: colors.text },
  successLabel: { marginTop: 6, color: colors.success, fontSize: 11, fontWeight: "800" },
  segmented: { flexDirection: "row", gap: 6, padding: 6, backgroundColor: colors.surfaceLow, borderRadius: 18 },
  segment: { flex: 1, minHeight: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  segmentActive: { backgroundColor: colors.surface },
  segmentText: { color: "#667383", fontWeight: "800", fontSize: 13 },
  segmentActiveText: { color: colors.primary, fontWeight: "800", fontSize: 13 },
  scheduleRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  scheduleCard: { flex: 1, backgroundColor: colors.surfaceLow, borderRadius: 18, minHeight: 58, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  softButton: { minHeight: 56, borderRadius: 18, backgroundColor: colors.surfaceLow, justifyContent: "center", alignItems: "center" },
  profileCard: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: { width: 64, height: 64, borderRadius: 20, backgroundColor: "#3f7aa5" },
  profileName: { color: colors.primary, fontWeight: "800", fontSize: 20 },
  tabs: { position: "absolute", left: 10, right: 10, bottom: 10, flexDirection: "row", backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 28, padding: 10, justifyContent: "space-between" },
  tab: { flex: 1, minHeight: 58, alignItems: "center", justifyContent: "center", borderRadius: 18, gap: 4, paddingHorizontal: 4 },
  tabActive: { backgroundColor: "#eef9f2" },
  tabGlyph: { color: "#8f99a8", fontWeight: "800", fontSize: 12 },
  tabGlyphActive: { color: "#1d7b51" },
  tabText: { color: "#8f99a8", fontWeight: "800", fontSize: 10 },
  tabTextActive: { color: "#1d7b51" }
});
