Feature: WorldThreads core behaviors

  Scenario: Each character has a continuous thread
    Given a world with characters "Mara" and "Ion"
    When the user sends a message to Mara
    And the user later returns to Mara
    Then the Mara thread shows the full prior conversation in order

  Scenario: Unified world-state is shared across characters
    Given the world state time_of_day is "DUSK"
    When the user chats with Mara
    And then chats with Ion
    Then both characters reference the same current time_of_day without contradiction

  Scenario: Off-screen life is stored as summaries, not hidden dialogue
    Given world ticking is enabled after user messages
    When the user sends a message to Mara
    Then the system stores 1 to 3 world event summaries
    And the system does not store any hidden multi-turn Mara-Ion dialogue transcript

  Scenario: World tick output is bounded
    When a world tick runs
    Then it outputs at most 3 events
    And it outputs at most 12 state patch operations
    And it outputs at most 3 hooks

  Scenario: Cost controls prevent repeated identical ticks
    Given the same tick inputs occur twice in a row
    When the second tick would run
    Then the system detects a cache hit and skips the tick

  Scenario: Canon stability is enforced
    Given the character canon states Mara hates "boats"
    When the user asks Mara to go sailing
    Then Mara responds consistently with canon unless the user explicitly retcons canon

  Scenario: Memory retrieval provides relevant prior moments
    Given the user previously mentioned "lighthouse map" to Ion
    When the user later asks Ion "what happened to the map?"
    Then Ion's response reflects the prior mention via retrieved memory or summary

  Scenario: BYOK key is required for AI calls
    Given no API key is set
    When the user attempts to chat
    Then the app prompts for a key and does not send any AI request