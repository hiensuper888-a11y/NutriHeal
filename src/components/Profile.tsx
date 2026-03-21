import React, { useState, useRef } from 'react';
import { User, Camera, Save, Lock, KeyRound } from 'lucide-react';
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
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);
  
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp.');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setLoadingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      setPasswordSuccess('Đổi mật khẩu thành công!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Đã có lỗi xảy ra khi đổi mật khẩu.');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
            <User size={24} />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-800">Hồ sơ cá nhân</h2>
        </div>
        
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-stone-100">
          <div className="relative group">
            <img src={profile.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="absolute bottom-0 right-0 p-2 bg-brand-600 hover:bg-brand-500 transition-colors text-white rounded-full shadow-md"
            >
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-800">{profile.name || 'Người dùng'}</h3>
            <p className="text-stone-500 text-sm">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Họ tên</label>
            <input type="text" placeholder="Nhập họ tên" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Ngày sinh</label>
            <input type="date" value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Hotline</label>
            <input type="text" placeholder="Số điện thoại" value={profile.hotline} onChange={(e) => setProfile({...profile, hotline: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Địa chỉ</label>
            <input type="text" placeholder="Địa chỉ liên hệ" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Công ty/Tổ chức</label>
            <input type="text" placeholder="Tên công ty" value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Bộ phận</label>
            <input type="text" placeholder="Phòng ban" value={profile.department} onChange={(e) => setProfile({...profile, department: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Chức vụ</label>
            <input type="text" placeholder="Vị trí công tác" value={profile.position} onChange={(e) => setProfile({...profile, position: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button onClick={handleUpdate} className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 transition-colors text-white rounded-xl font-medium shadow-sm">
            <Save size={18} /> Lưu thay đổi
          </button>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-stone-100 text-stone-600 rounded-lg">
            <KeyRound size={24} />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-800">Bảo mật & Mật khẩu</h2>
        </div>
        
        <form onSubmit={handleChangePassword} className="max-w-md space-y-5">
          {passwordError && (
            <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-sm">
              {passwordSuccess}
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Mật khẩu mới</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Xác nhận mật khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loadingPassword}
            className="px-6 py-3 bg-stone-800 hover:bg-stone-900 transition-colors text-white rounded-xl font-medium shadow-sm disabled:opacity-50"
          >
            {loadingPassword ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
}
