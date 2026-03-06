import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const THEMES = {
  midnight: {
    bg: '#081229',
    card: '#0f1f40',
    cardBorder: '#2a4274',
    title: '#f6f8ff',
    body: '#b8c7ea',
    accent: '#19d3a2',
    accentPressed: '#10b88a',
    inputBg: '#10264d',
    inputBorder: '#36588f',
    blobA: '#15346f',
    blobB: '#0a8ea8',
    badgeBg: '#132f63',
    badgeText: '#86b7ff',
    previewBg: '#0c1a36',
    buttonText: '#052216',
  },
  sunrise: {
    bg: '#20102f',
    card: '#34124d',
    cardBorder: '#7f4ab3',
    title: '#fff4df',
    body: '#ffd9b8',
    accent: '#ffb347',
    accentPressed: '#f39a1f',
    inputBg: '#4a1d66',
    inputBorder: '#9663c2',
    blobA: '#6a2ca0',
    blobB: '#ff7e5f',
    badgeBg: '#5b2a89',
    badgeText: '#ffd58a',
    previewBg: '#42195d',
    buttonText: '#3e2000',
  },
};

const COLORS = THEMES.midnight;

const GREETINGS = ['Hello', 'Hi', 'Welcome', 'Great to see you', 'Code on'];
const MAX_NAME_LENGTH = 20;

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [useSunriseTheme, setUseSunriseTheme] = useState(false);
  const [greeting, setGreeting] = useState('Hello');
  const [history, setHistory] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  const colors = useSunriseTheme ? THEMES.sunrise : THEMES.midnight;
  const trimmedName = name.trim();

  const getRandomGreeting = () => {
    const index = Math.floor(Math.random() * GREETINGS.length);
    setGreeting(GREETINGS[index]);
  };

  const addToHistory = (line: string) => {
    setHistory((prev) => [line, ...prev].slice(0, 5));
  };

  const handleResetName = () => {
    setName('');
  };

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCounter((prev) => Math.max(0, prev - 1));
  };

  const handleAddTodo = () => {
    const value = todoInput.trim();

    if (!value) {
      Alert.alert('Missing Item', 'Type a to-do item before adding.');
      return;
    }

    setTodos((prev) => [value, ...prev]);
    setTodoInput('');
  };

  const handleRemoveTodo = (indexToRemove: number) => {
    setTodos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePress = () => {
    if (!trimmedName) {
      Alert.alert('Missing Name', 'Please type your name first.');
      return;
    }

    const message = `${greeting}, ${trimmedName}! Welcome to CIS 228.`;
    Alert.alert('Greeting Sent', message);
    addToHistory(message);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}> 
      <View style={[styles.blobTop, { backgroundColor: colors.blobA }]} />
      <View style={[styles.blobBottom, { backgroundColor: colors.blobB }]} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
          <View style={styles.topRow}>
            <Text style={[styles.badge, { backgroundColor: colors.badgeBg, color: colors.badgeText }]}>CIS 228 PROJECT</Text>
            <Pressable
              style={({ pressed }) => [
                styles.themeChip,
                { borderColor: colors.inputBorder, backgroundColor: colors.inputBg },
                pressed && styles.themeChipPressed,
              ]}
              onPress={() => setUseSunriseTheme((prev) => !prev)}>
              <Text style={[styles.themeChipText, { color: colors.body }]}>
                {useSunriseTheme ? 'Midnight' : 'Sunrise'} Theme
              </Text>
            </Pressable>
          </View>

          <Text style={[styles.title, { color: colors.title }]}>CIS 228 Greeting Studio</Text>
          <Text style={[styles.subtitle, { color: colors.body }]}>Build, preview, and send your custom hello.</Text>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.image}
          />

          <TextInput
            style={[styles.input, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg, color: colors.title }]}
            placeholder="Type your name"
            placeholderTextColor="#90a7d4"
            value={name}
            maxLength={MAX_NAME_LENGTH}
            onChangeText={setName}
          />
          <Text style={[styles.counterText, { color: colors.body }]}>
            {name.length}/{MAX_NAME_LENGTH} characters
          </Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.accent },
                pressed && [styles.buttonPressed, { backgroundColor: colors.accentPressed }],
              ]}
              onPress={handlePress}>
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Say Hello</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { borderColor: colors.inputBorder, backgroundColor: colors.inputBg },
                pressed && styles.secondaryButtonPressed,
              ]}
              onPress={getRandomGreeting}>
              <Text style={[styles.secondaryButtonText, { color: colors.body }]}>Random Greeting</Text>
            </Pressable>
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { borderColor: colors.inputBorder, backgroundColor: colors.inputBg },
                pressed && styles.secondaryButtonPressed,
              ]}
              onPress={handleResetName}>
              <Text style={[styles.secondaryButtonText, { color: colors.body }]}>Reset Name</Text>
            </Pressable>
          </View>

          <View style={[styles.previewBox, { borderColor: colors.inputBorder, backgroundColor: colors.previewBg }]}> 
            <Text style={[styles.previewLabel, { color: colors.badgeText }]}>Live Preview</Text>
            <Text style={[styles.previewText, { color: colors.title }]}> 
              {trimmedName ? `${greeting}, ${trimmedName}!` : `${greeting}, future developer!`}
            </Text>
          </View>

          <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle, { color: colors.title }]}>Greeting History</Text>
            <Pressable
              style={({ pressed }) => [
                styles.clearChip,
                { borderColor: colors.inputBorder },
                pressed && styles.themeChipPressed,
              ]}
              onPress={() => setHistory([])}>
              <Text style={[styles.clearChipText, { color: colors.body }]}>Clear</Text>
            </Pressable>
          </View>

          <View style={[styles.historyBox, { borderColor: colors.inputBorder, backgroundColor: colors.previewBg }]}> 
            {history.length === 0 ? (
              <Text style={[styles.emptyHistoryText, { color: colors.body }]}>No greetings yet. Send one to start.</Text>
            ) : (
              history.map((line, index) => (
                <Text key={`${line}-${index}`} style={[styles.historyItem, { color: colors.title }]}>
                  {index + 1}. {line}
                </Text>
              ))
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.historyTitle, { color: colors.title }]}>Counter</Text>
          </View>
          <View style={[styles.counterBox, { borderColor: colors.inputBorder, backgroundColor: colors.previewBg }]}>
            <Text style={[styles.counterValue, { color: colors.title }]}>{counter}</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor: colors.inputBorder, backgroundColor: colors.inputBg },
                  pressed && styles.secondaryButtonPressed,
                ]}
                onPress={handleDecrement}>
                <Text style={[styles.secondaryButtonText, { color: colors.body }]}>Decrement</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: colors.accent },
                  pressed && [styles.buttonPressed, { backgroundColor: colors.accentPressed }],
                ]}
                onPress={handleIncrement}>
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>Increment</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.historyTitle, { color: colors.title }]}>Mini To-Do List</Text>
          </View>
          <TextInput
            style={[styles.input, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg, color: colors.title }]}
            placeholder="Add a to-do item"
            placeholderTextColor="#90a7d4"
            value={todoInput}
            onChangeText={setTodoInput}
          />
          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.accent },
                pressed && [styles.buttonPressed, { backgroundColor: colors.accentPressed }],
              ]}
              onPress={handleAddTodo}>
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Add Item</Text>
            </Pressable>
          </View>

          <View style={[styles.todoBox, { borderColor: colors.inputBorder, backgroundColor: colors.previewBg }]}> 
            {todos.length === 0 ? (
              <Text style={[styles.emptyHistoryText, { color: colors.body }]}>No to-do items yet.</Text>
            ) : (
              todos.map((todo, index) => (
                <View key={`${todo}-${index}`} style={styles.todoRow}>
                  <Text style={[styles.todoText, { color: colors.title }]}>- {todo}</Text>
                  <Pressable onPress={() => handleRemoveTodo(index)}>
                    <Text style={[styles.removeText, { color: colors.badgeText }]}>Remove</Text>
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  blobTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.blobA,
    top: -80,
    left: -60,
  },
  blobBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.blobB,
    opacity: 0.35,
    bottom: -130,
    right: -90,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  themeChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  themeChipPressed: {
    opacity: 0.8,
  },
  themeChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.title,
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.body,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 14,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  counterText: {
    fontSize: 12,
    marginBottom: 12,
    alignSelf: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  secondaryButtonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  previewBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 14,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.6,
  },
  previewText: {
    fontSize: 17,
    fontWeight: '600',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  clearChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  clearChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  historyBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 90,
    marginBottom: 14,
  },
  emptyHistoryText: {
    fontSize: 13,
  },
  historyItem: {
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 18,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  counterBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  counterValue: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  todoBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 90,
  },
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  todoText: {
    fontSize: 14,
    flex: 1,
  },
  removeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
