import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
  },
  
  container: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
    textAlign: 'left',
  },
  header: {
    backgroundColor: '#4285F4',
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  table: {
    marginTop: 20,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellLabel: {
    flex: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCellValue: {
    flex: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
});

const InvoicePDF = ({ propertyData }) => {
  const { property, booking } = propertyData;
  const { vendor, user } = property;

  return (
    <PDFViewer width="100%" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Text style={styles.header}>Invoice</Text>
            
            <View style={styles.section}>
              <Text style={styles.subHeader}>Property Details</Text>
              <Text style={styles.label}>Property Title:</Text>
              <Text style={styles.value}>{property.title}</Text>
              <Image
                src={process.env.REACT_APP_API_BASE_URL + propertyData.property.image1}
                style={styles.propertyImage}
              />
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{property.address}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.subHeader}>Booking Details</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Amount Paid (₹)</Text>
                  <Text style={styles.tableCellValue}>{property.price}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Check-in Date</Text>
                  <Text style={styles.tableCellValue}>{booking.check_in_date}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Check-out Date</Text>
                  <Text style={styles.tableCellValue}>{booking.check_out_date}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.label}>Current Status:</Text>
              <Text style={styles.value}>{booking.status}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.subHeader}>Vendor Details</Text>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{vendor.vendor_details.first_name}</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{vendor.vendor_details.email}</Text>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{vendor.vendor_details.phone_number}</Text>
            </View>
            
            
            
            <Text style={styles.footer}>Thank you for your business!</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePDF;
