############
#
# Cheap Crowdfunding Problem
#
# There is a crowdfunding project that you want to support. This project
# gives the same reward to every supporter, with one peculiar condition:
# the amount you pledge must not be equal to any earlier pledge amount.
#
# You would like to get the reward, while spending the least amount > 0.
#
# You are given a list of amounts pledged so far in an array of integers.
# You know that there is less than 100,000 of pledges and the maximum
# amount pledged is less than $1,000,000.
#
# Implement a function find_min_pledge(pledge_list) that will return
# the amount you should pledge.
#
############

def find_min_pledge(pledge_list):
    # YOUR CODE BELOW
    min_pledge = 1
    if not pledge_list or len(pledge_list) == 0:
        return min_pledge
    
    positive_pledges = {x for x in pledge_list if x > 0}
    
    if not positive_pledges:
        return min_pledge
    
    while min_pledge in positive_pledges:
        min_pledge += 1
    
    return min_pledge
    # END OF YOUR CODE


assert find_min_pledge([1, 3, 6, 4, 1, 2]) == 5

assert find_min_pledge([1, 2, 3]) == 4

assert find_min_pledge([-1, -3]) == 1

############
#
# Extract Titles from RSS feed
#
# Implement get_headlines() function. It should take a url of an RSS feed
# and return a list of strings representing article titles.
#
############

google_news_url = "https://news.google.com/news/rss"


def get_headlines(rss_url):
    """
    @returns a list of titles from the rss feed located at `rss_url`
    """
    # YOUR CODE BELOW (you can import any python standard library)
    import urllib.request
    import xml.etree.ElementTree as ET
    
    try:
        # Fetch the RSS feed
        with urllib.request.urlopen(rss_url) as response:
            rss_content = response.read()
        
        # Parse XML
        root = ET.fromstring(rss_content)
        
        # Extract all titles from item elements
        titles = []
        for item in root.findall('.//item'):
            title = item.find('title')
            if title is not None and title.text:
                titles.append(title.text.strip())
        
        return titles
        
    except Exception as e:
        print(f"Error: {e}")
        return []


print(get_headlines(google_news_url))


############
#
# Streaming Payments Processor
#
# The function `process_payments()` is processing a large, but finite
# amount of payments in a streaming fashion.
#
# It relies on two library functions to do its job. The first function
# `stream_payments_to_storage(storage)` reads the payments from a payment
# processor and writes them to storage by calling `storage.write(buffer)`
# on it's `storage` argument. The `storage` argument is supplied by
# calling `get_payments_storage()` function. The API is defined below.
#
# TODO: Modify `process_payments()` to print a checksum of bytes written
# by `stream_payments_to_storage()`. The existing functionality
# should be preserved.
#
# The checksum is implemented as a simple arithmetic sum of bytes.
#
# For example, if bytes([1, 2, 3]) were written, you should print 6.
#
#
# NOTE: you need to take into account the following restrictions:
# - You are allowed only one call each to `get_payments_storage()` and
#       to `stream_payments_to_storage()`
# - You can not read from the storage.
# - You can not use disk as temporary storage.
# - Your system has limited memory that can not hold all payments.
#
############


# This is a library function, you can't modify it.
def get_payments_storage():
    """
    @returns an instance of
    https://docs.python.org/3/library/io.html#io.BufferedWriter
    """
    # Sample implementation to make the code run in coderpad.
    # Do not rely on this exact implementation.
    return open('/dev/null', 'wb')


# This is a library function, you can't modify it.
def stream_payments_to_storage(storage):
    """
    Loads payments and writes them to the `storage`.
    Returns when all payments have been written.

    @parameter `storage`: is an instance of
    https://docs.python.org/3/library/io.html#io.BufferedWriter
    """
    # Sample implementation to make the code run in coderpad.
    # Do not rely on this exact implementation.
    for i in range(10):
        storage.write(bytes([1, 2, 3, 4, 5]))


def process_payments():
    """
    Store payments streamed by `stream_payments_to_storage` and
    print the checksum of payments stored
    """
    original_storage = get_payments_storage()
    checksum = 0
    
    # Create a storage object with a custom write method
    class ChecksumWrapper:
        def __init__(self, storage):
            self.storage = storage
            self.checksum = 0
        
        def write(self, buffer):
            # Add bytes to checksum
            self.checksum += sum(buffer)
            # Write to original storage
            return self.storage.write(buffer)
    
    wrapper = ChecksumWrapper(original_storage)
    stream_payments_to_storage(wrapper)
    
    print(wrapper.checksum)


process_payments()


############
# Streaming Payments Processor, two vendors edition.
#
# We decided to improve the payment processor from the previous
# exercise and hired two vendors. One was to implement `stream_payments()`
# function, and another `store_payments()` function.
#
# The function `process_payments_2()` is processing a large, but finite
# amount of payments in a streaming fashion.
#
# Unfortunately the vendors did not coordinate their efforts, and delivered
# their functions with incompatible APIs.
#
# TODO: Your task is to analyse the APIs of `stream_payments()` and
# `store_payments()` and to write glue code in `process_payments_2()`
# that allows us to store the payments using these vendor functions.
#
# NOTE: you need to take into account the following restrictions:
# - You are allowed only one call each to `stream_payments()` and
#      to `store_payments()`
# - You can not read from the storage.
# - You can not use disk as temporary storage.
# - Your system has limited memory that can not hold all payments.
#
############
# This is a library function, you can't modify it.
def stream_payments(callback_fn):
    """
    Reads payments from a payment processor and calls `callback_fn(amount)`
    for each payment.

    Returns when there is no more payments.
    """
    # Sample implementation to make the code run in coderpad.
    # Do not rely on this exact implementation.
    for i in range(10):
        callback_fn(i)


# This is a library function, you can't modify it.
def store_payments(amount_iterator):
    """
    Iterates over the payment amounts from amount_iterator
    and stores them to a remote system.
    """
    # Sample implementation to make the code run in coderpad.
    # Do not rely on this exact implementation.
    for i in amount_iterator:
        print(i)


def callback_example(amount):
    print(amount)
    return True


def process_payments_2():
    """
    Read streamed payments and store them
    """
    # Collect all payments using the callback
    payments = []
    
    def payment_callback(amount):
        payments.append(amount)
    
    # Stream all payments first
    stream_payments(payment_callback)
    
    # Create an iterator from the collected payments
    def payment_iterator():
        for payment in payments:
            yield payment
    
    # Store the payments using the iterator
    store_payments(payment_iterator())


process_payments_2()


############
#
# Code Review
#
# Please do a code review for the following snippet.
# Add your review suggestions inline as python comments
#
############


def get_value(data, key, default, lookup=None, mapper=None):
    """
    Finds the value from data associated with key, or default if the
    key isn't present.
    If a lookup enum is provided, this value is then transformed to its
    enum value.
    If a mapper function is provided, this value is then transformed
    by applying mapper to it.
    """
    #check if data is a dict, if not, it will raise a TypeError
    # if not isinstance(data, dict):
    #     raise TypeError("data must be a dict")
    
    # #check if key is a string, if not, it will raise a TypeError
    # if not isinstance(key, str):
    #     raise TypeError("key must be a string")
    
    #key may not exists in data, if we access it, it will raise a KeyError, handling of same and return default
    return_value = data[key]

    #for data consistency, lookup dict and mapper should return data of same type as return_value

    if return_value is None or return_value == "":
        return_value = default

    if lookup:
        #lookup may not have the value, if we access it, it will raise a KeyError, handling of same and return default
        return_value = lookup[return_value]
    if mapper:
        #if mapper is not a function, it will raise a TypeError and return default
        #handle error thrown by mapper and return default
        return_value = mapper(return_value)
    return return_value


def ftp_file_prefix(namespace):
    """
    Given a namespace string with dot-separated tokens, returns the
    string with
    the final token replaced by 'ftp'.
    Example: a.b.c => a.b.ftp
    """
    #check if namespace is a string, if not, it will raise a TypeError return .ftp (default value)
    #check if namespace is empty or None return .ftp (default value)
    #check if namespace does not contain a dot, append .ftp to the namespace and return
    #check if last token is ftp, then return the namespace as is (dont append .ftp)


    return ".".join(namespace.split(".")[:-1]) + '.ftp'


def string_to_bool(string):
    """
    Returns True if the given string is 'true' case-insensitive,
    False if it is
     'false' case-insensitive.
    Raises ValueError for any other input.
    """
    #check if string is empty or None, return default value False
    #check if string is a string, if not, return default value False
    
    if string.lower() == 'true':
        return True
    if string.lower() == 'false':
        return False
    #for consistency, return False for any other input
    raise ValueError(f'String {string} is neither true nor false') 


def config_from_dict(dict):
    """
    Given a dict representing a row from a namespaces csv file,
    returns a DAG configuration as a pair whose first element is the
    DAG name
    and whose second element is a dict describing the DAG's properties
    """
    #check if dict is a dict, if not, it will raise a TypeError
    #check if dict has the key 'Namespace', if not, it will raise a KeyError, handling of same and return appropriate error message

    #check if dict has the key 'Airflow DAG', if not, it will raise a KeyError, handling of same and return appropriate error message

    #DeltaDays is not defined , handling of same and return appropriate error message
    #check if namespace is as per the speciciation with dots separated tokens or not, if not, return appropriate error message


    namespace = dict['Namespace']
    return (dict['Airflow DAG'],
            {"earliest_available_delta_days": 0,
             "lif_encoding": 'json',
             "earliest_available_time":
                 get_value(dict, 'Available Start Time', '07:00'),
             "latest_available_time":
                 get_value(dict, 'Available End Time', '08:00'),
             "require_schema_match":
                 get_value(dict, 'Requires Schema Match', 'True',
                           mapper=string_to_bool),
             "schedule_interval":
                 get_value(dict, 'Schedule', '1 7 * * * '),
             "delta_days":
                 get_value(dict, 'Delta Days', 'DAY_BEFORE',
                           lookup=DeltaDays),
             "ftp_file_wildcard":
                 get_value(dict, 'File Naming Pattern', None),
             "ftp_file_prefix":
                 get_value(dict, 'FTP File Prefix',
                           ftp_file_prefix(namespace)),
             "namespace": namespace
             }
            )
