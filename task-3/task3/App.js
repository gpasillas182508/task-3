// TASK 3 — Modals, ScrollView and SafeAreaView (starter)
// Start point: the solution of Task 2 + new data. Follow the steps in README.md.
import { useState } from 'react';
// TODO: add the imports you need in each step (Modal, SafeAreaView from 'react-native-safe-area-context'...)
import { View, Text, Image, Pressable, TextInput, Button, Alert, ScrollView, StyleSheet, Platform } from 'react-native';

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
  // TODO STEP 1: add the state that says if the modal is visible
  // TODO STEP 4: add the state for the selected contacts (an array)

  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const isSendDisabled = message.trim().length === 0;
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

  const handleSharePress = () => {
    Alert.alert('Share profile', 'Sharing is not implemented yet.');
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

  // TODO STEP 2: write closeModal
  // TODO STEP 4: write handleContactPress and handleConfirmShare

  // TODO STEP 5: wrap the whole screen in a SafeAreaView
  return (
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

          {/* TODO STEP 3: add the 'Recent projects' horizontal ScrollView here (use PROJECTS) */}
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
            {/* TODO STEP 1: this button must open the modal (replace the Alert) */}
            <Button title="Share profile" color={COLORS.primary} onPress={handleSharePress} />
          </View>
        </View>
      </View>

      {/* TODO STEP 1-4: add the <Modal> here */}
    </ScrollView>
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
});
