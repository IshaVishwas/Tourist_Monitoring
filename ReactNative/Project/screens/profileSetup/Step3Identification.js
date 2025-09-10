import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function Step3Identification({ defaultValues = {}, onNext }) {
  const [digitalTouristId, setDigitalTouristId] = useState(defaultValues.digitalTouristId || '');
  const [generating, setGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  const generateBlockchainId = () => {
    setGenerating(true);
    setTimeout(() => {
      setDigitalTouristId('DGT' + Math.floor(100000 + Math.random() * 900000) + 'BC');
      setGenerating(false);
    }, 1500);
  };

  const handleUpload = (type) => {
    // Mock upload
    setUploadedFile(type === 'camera' ? 'passport_camera.jpg' : 'id_gallery.jpg');
    alert('Mock upload: ' + (type === 'camera' ? 'Camera' : 'Gallery'));
  };

  const onSubmit = data => {
    onNext({ ...data, digitalTouristId });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Digital Tourist ID</Text>
      <View style={styles.idBox}>
        <Text style={styles.idText}>{digitalTouristId || 'Not generated'}</Text>
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={generateBlockchainId} disabled={generating}>
        <Text style={styles.saveText}>{generating ? 'Generating...' : 'Generate on Blockchain'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Upload ID Proof</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => handleUpload('camera')}>
          <Image source={require('../../assets/profile/camera.png')} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => handleUpload('gallery')}>
          <Image source={require('../../assets/ui/gallery.png')} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Gallery</Text>
        </TouchableOpacity>
      </View>
      {uploadedFile && <Text style={styles.uploadHint}>Uploaded: {uploadedFile}</Text>}

      <Text style={styles.label}>Aadhaar Card ID (optional)</Text>
      <Controller
        control={control}
        name="aadhaar"
        rules={{ pattern: { value: /^\d{12}$/, message: 'Must be 12 digits' } }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Aadhaar Card Number"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={12}
          />
        )}
      />
      {errors.aadhaar && <Text style={styles.error}>{errors.aadhaar.message}</Text>}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 4,
    marginTop: 12,
  },
  idBox: {
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
    alignItems: 'center',
  },
  idText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  uploadBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#fff',
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadHint: {
    color: '#64748b',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
  },
  error: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 2,
  },
  saveBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 18,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
