export const idlFactory = ({ IDL }) => {
  const AnonymousUserData = IDL.Record({
    'texts' : IDL.Vec(IDL.Nat64),
    'created_at' : IDL.Nat64,
    'decryption_key' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UserText = IDL.Record({ 'id' : IDL.Text, 'text' : IDL.Vec(IDL.Nat8) });
  const OneTimeKey = IDL.Record({
    'public_key' : IDL.Vec(IDL.Nat8),
    'expiration' : IDL.Nat64,
  });
  const LogEntry = IDL.Record({
    'counter' : IDL.Nat64,
    'file' : IDL.Text,
    'line' : IDL.Nat32,
    'version' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Nat64,
  });
  const Result = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)),
    'Err' : IDL.Text,
  });
  const Task = IDL.Variant({
    'CleanUpKeys' : IDL.Null,
    'SendText' : IDL.Record({ 'body' : IDL.Text, 'phone_number' : IDL.Text }),
    'CleanUpAnonymousUsers' : IDL.Null,
    'SendEmail' : IDL.Record({
      'subject' : IDL.Text,
      'body' : IDL.Text,
      'email' : IDL.Text,
    }),
    'Initialize' : IDL.Null,
  });
  const TaskTimerEntry = IDL.Record({ 'task' : Task, 'time' : IDL.Nat64 });
  const AuthenticatedSignature = IDL.Record({
    'signature' : IDL.Vec(IDL.Nat8),
    'created_at' : IDL.Nat64,
  });
  const IdentifiedUserData = IDL.Record({
    'texts' : IDL.Vec(IDL.Nat64),
    'signature' : IDL.Opt(AuthenticatedSignature),
    'public_key' : IDL.Vec(IDL.Nat8),
  });
  return IDL.Service({
    'anonymous_user' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [AnonymousUserData],
        ['query'],
      ),
    'anonymous_user_notes' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Vec(UserText)],
        ['query'],
      ),
    'canister_cycle_balance' : IDL.Func([], [IDL.Nat], ['query']),
    'edit_encrypted_text' : IDL.Func(
        [IDL.Nat64, IDL.Vec(IDL.Nat8), IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
        [],
      ),
    'encrypted_ibe_decryption_key_for_caller' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Vec(IDL.Nat8)],
        [],
      ),
    'encrypted_symmetric_key_for_caller' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Vec(IDL.Nat8)],
        [],
      ),
    'get_one_time_key' : IDL.Func([IDL.Nat64], [IDL.Vec(IDL.Nat8)], ['query']),
    'get_one_time_key_details' : IDL.Func([IDL.Nat64], [OneTimeKey], ['query']),
    'ibe_encryption_key' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'partition_details' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat8))],
        ['query'],
      ),
    'print_log_entries' : IDL.Func([], [IDL.Vec(LogEntry)], ['query']),
    'print_log_entries_page' : IDL.Func(
        [IDL.Nat64, IDL.Opt(IDL.Nat64)],
        [IDL.Vec(IDL.Text)],
        ['query'],
      ),
    'read_with_one_time_key' : IDL.Func(
        [IDL.Nat64, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [Result],
        [],
      ),
    'request_two_factor_authentication_for_caller' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'save_encrypted_text' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Opt(IDL.Vec(IDL.Nat8))],
        [IDL.Nat64],
        [],
      ),
    'set_one_time_key' : IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat8)], [], []),
    'symmetric_key_verification_key' : IDL.Func(
        [],
        [IDL.Vec(IDL.Nat8)],
        ['query'],
      ),
    'timers' : IDL.Func([], [IDL.Vec(TaskTimerEntry)], ['query']),
    'two_factor_verification_key' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    'user_data' : IDL.Func([], [IdentifiedUserData], ['query']),
    'user_notes' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [IDL.Nat64, IDL.Vec(UserText)],
        ['query'],
      ),
    'version' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
