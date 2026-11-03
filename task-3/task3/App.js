// TASK 3 — Modals, ScrollView and SafeAreaView (starter)
// Start point: the solution of Task 2 + new data. Follow the steps in README.md.
import { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, Button, Alert, ScrollView, StyleSheet, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1B1F2A',
  muted: '#6B7280',
  primary: '#2F6FED',
  primaryLight: '#E6EEFF',
  border: '#E5E7EB',
  online: '#22C55E',
  offline: '#9CA3AF',
};

const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. When I am not coding, I mentor junior developers, contribute to open source and explore new coffee shops around the city.';

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];
const BASE_FOLLOWERS = 1200;
const MAX_MESSAGE = 140;

const PROJECTS = [
  { name: 'Weather App', tech: 'React Native', stars: 128 },
  { name: 'Task Tracker', tech: 'Expo', stars: 96 },
  { name: 'Photo Gallery', tech: 'Expo Camera', stars: 74 },
  { name: 'Recipe Book', tech: 'FlatList', stars: 61 },
  { name: 'Chat UI', tech: 'Flexbox', stars: 45 },
];

const CONTACTS = [
  'Ana López',
  'Ben Carter',
  'Carla Ruiz',
  'David Kim',
  'Elena Petrova',
  'Farid Hassan',
  'Grace Liu',
  'Hugo Silva',
];

// Adds thousands separators: 1200 -> '1,200'
function formatCount(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const isSendDisabled = message.trim().length === 0;
  const isShareDisabled = selectedContacts.length === 0;
  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: formatCount(followers) },
    { label: 'Following', value: '180' },
  ];

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessagePress = () => {
    setIsComposerOpen(!isComposerOpen);
  };

  const handleSendPress = () => {
    Alert.alert('Message sent', `To Alex: "${message.trim()}"`);
    setMessage('');
    setIsComposerOpen(false);
  };

  const handleSkillPress = (skill) => {
    // Never modify the array directly: create a new one.
    setSelectedSkills(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((item) => item !== skill)
        : [...selectedSkills, skill]
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedContacts([]);
  };

  const handleContactPress = (name) => {
    setSelectedContacts((currentContacts) =>
      currentContacts.includes(name)
        ? currentContacts.filter((contact) => contact !== name)
        : [...currentContacts, name]
    );
  };

  const handleConfirmShare = () => {
    const names = selectedContacts.join(', ');
    Alert.alert('Profile shared', 'Sent to: ' + names);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.safe}>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Image
          source={require('./assets/banner.png')}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => setIsOnline(!isOnline)}>
              <Image source={require('./assets/avatar.png')} style={styles.avatar} />
              <View style={[styles.onlineBadge, !isOnline && styles.offlineBadge]} />
            </Pressable>
            <View style={styles.headerText}>
              <Text style={styles.name}>Alex Rivera</Text>
              <Text style={styles.role}>Mobile Developer</Text>
              <Text style={styles.location}>Lisbon, Portugal</Text>
            </View>
          </View>

          <Text style={styles.bio} numberOfLines={isBioExpanded ? undefined : 3}>
            {BIO}
          </Text>
          <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
            <Text style={styles.link}>{isBioExpanded ? 'Show less' : 'Read more'}</Text>
          </Pressable>

          <View style={styles.statsRow}>
            {stats.map((item, index) => (
              <View
                key={item.label}
                style={[styles.stat, index < stats.length - 1 && styles.statDivider]}
              >
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tags}>
            {SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <Pressable
                  key={skill}
                  onPress={() => handleSkillPress(skill)}
                  style={({ pressed }) => [
                    styles.tag,
                    isSelected && styles.tagSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                    {skill}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.hint}>
            Tap a skill to select it · {selectedSkills.length} selected
          </Text>

          <Text style={styles.sectionTitle}>RECENT PROJECTS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsRow}
          >
            {PROJECTS.map((project) => (
              <View key={project.name} style={styles.projectCard}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectTech}>{project.tech}</Text>
                <Text style={styles.projectStars}>★ {project.stars}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.actions}>
            <Pressable
              onPress={handleFollowPress}
              style={({ pressed }) => [
                styles.button,
                isFollowing ? styles.buttonFollowing : styles.buttonPrimary,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.buttonText, !isFollowing && styles.buttonTextPrimary]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleMessagePress}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={styles.buttonText}>{isComposerOpen ? 'Close' : 'Message'}</Text>
            </Pressable>
          </View>

          {isComposerOpen && (
            <View style={styles.composer}>
              <TextInput
                style={styles.input}
                placeholder="Write a message to Alex"
                placeholderTextColor={COLORS.muted}
                value={message}
                onChangeText={(newText) => setMessage(newText)}
                maxLength={MAX_MESSAGE}
              />
              <View style={styles.composerFooter}>
                <Text style={styles.counter}>
                  {message.length}/{MAX_MESSAGE} characters
                </Text>
                <Pressable
                  disabled={isSendDisabled}
                  onPress={handleSendPress}
                  style={({ pressed }) => [
                    styles.sendButton,
                    isSendDisabled && styles.sendButtonDisabled,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.sendText}>Send</Text>
                </Pressable>
              </View>
            </View>
          )}


          <View style={styles.shareWrapper}>
            <Button
              title="Share profile"
              color={COLORS.primary}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </View>

    </ScrollView>

    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Share profile</Text>
          <Text style={styles.sheetText}>Choose who gets Alex's profile.</Text>

          <ScrollView style={styles.contactList}>
            {CONTACTS.map((name) => {
              const isSelected = selectedContacts.includes(name);
              return (
                <Pressable
                  key={name}
                  onPress={() => handleContactPress(name)}
                  style={({ pressed }) => [
                    styles.contactRow,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.contactName}>{name}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          <Pressable
            disabled={isShareDisabled}
            onPress={handleConfirmShare}
            style={({ pressed }) => [
              styles.shareButton,
              isShareDisabled && styles.shareButtonDisabled,
              pressed && !isShareDisabled && styles.pressed,
            ]}
          >
            <Text style={styles.shareButtonText}>
              {isShareDisabled ? 'Select contacts' : `Share with ${selectedContacts.length}`}
            </Text>
          </Pressable>

          <Pressable
            onPress={closeModal}
            style={({ pressed }) => [styles.sheetClose, pressed && styles.pressed]}
          >
            <Text style={styles.sheetCloseText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  android: {
    elevation: 6,
  },
  default: {},
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  sheetText: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.muted,
  },
  sheetClose: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sheetCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.muted,
  },
  projectsRow: {
    gap: 12,
    paddingRight: 4,
  },
  projectCard: {
    width: 140,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  projectTech: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
  projectStars: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contactList: {
    maxHeight: 240,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactName: {
    fontSize: 15,
    color: COLORS.text,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.offline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkMark: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  shareButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  shareButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    ...cardShadow,
  },
  banner: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -44,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  onlineBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 3,
    borderColor: COLORS.card,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  headerText: {
    flex: 1,
    marginLeft: 14,
    marginTop: 52,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  role: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  bio: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.text,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.6,
  },
  composer: {
    marginTop: 16,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  sheetText: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.muted,
  },
  sheetClose: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sheetCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.muted,
  },
  projectsRow: {
    gap: 12,
    paddingRight: 4,
  },
  projectCard: {
    width: 140,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  projectTech: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
  projectStars: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contactList: {
    maxHeight: 240,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactName: {
    fontSize: 15,
    color: COLORS.text,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.offline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkMark: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  shareButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  shareButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
