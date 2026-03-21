import React, { useState, useRef } from 'react';
import { User, Camera, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProfileProps {
  user: any;
  onUpdate: (profile: any) => void;
}

export function Profile({ user, onUpdate }: ProfileProps) {
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || '',
    dob: '',
    hotline: '',
    address: '',
    company: '',
    department: '',
    position: '',
    avatar: user?.user_metadata?.avatar_url || '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    setProfile({ ...profile, avatar: publicUrl });
  };

  const handleUpdate = () => {
    onUpdate(profile);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
      <h2 className="text-xl font-serif font-bold mb-6">Hồ sơ cá nhân</h2>
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img src={profile.avatar || 'https://via.placeholder.com/100'} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
          <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
          <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-brand-600 text-white rounded-full"><Camera size={16} /></button>
        </div>
        <button onClick={handleUpdate} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl">
          <Save size={16} /> Lưu hồ sơ
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Họ tên" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="p-3 border rounded-xl" />
        <input type="date" placeholder="Ngày sinh" value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} className="p-3 border rounded-xl" />
        <input type="text" placeholder="Hotline" value={profile.hotline} onChange={(e) => setProfile({...profile, hotline: e.target.value})} className="p-3 border rounded-xl" />
        <input type="text" placeholder="Địa chỉ" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="p-3 border rounded-xl" />
        <input type="text" placeholder="Công ty/Tổ chức" value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})} className="p-3 border rounded-xl" />
        <input type="text" placeholder="Bộ phận" value={profile.department} onChange={(e) => setProfile({...profile, department: e.target.value})} className="p-3 border rounded-xl" />
        <input type="text" placeholder="Chức vụ" value={profile.position} onChange={(e) => setProfile({...profile, position: e.target.value})} className="p-3 border rounded-xl" />
      </div>
    </div>
  );
}
