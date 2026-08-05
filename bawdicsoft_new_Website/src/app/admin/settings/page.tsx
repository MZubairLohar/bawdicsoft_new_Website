const handleChangePassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('');
  setError('');

  if (newPassword !== confirmNewPassword) {
    setError('New passwords do not match');
    return;
  }

  if (newPassword.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  try {
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setError(data.error || 'Failed to update password');
    }
  } catch (err) {
    setError('An error occurred while updating password');
    console.error('Password change error:', err);
  }
};