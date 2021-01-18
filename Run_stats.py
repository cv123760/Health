
def main():

    # Requested information
    '''dist =  float(input("Total Distance :  "))
    time = float(input("Total Time:  "))
    interval= float(input("how long will your intrvals be?  "))
    workout_time = float (input("How many minutes will you work out for?:  "))'''

    dist =  1.5
    time = 10.5
    interval= .25
    workout_time = 20

    pace = time/dist
    qmt =  pace/4 - 4/60

    fast_time = 4*qmt*interval
    fast_pace = fast_time/interval

    slow_time = fast_time *2
    slow_pace = slow_time/interval
    intervals = workout_time/(fast_time+slow_time)*2
    total_distance = intervals*interval



    return(total_distance) 
    '''

    



    fast_time = add_seconds( fast_time)
    fast_pace = add_seconds(fast_pace)
    slow_time = add_seconds(slow_time)
    slow_pace = add_seconds(slow_pace)




    print()
    print()

    print("fast interval:")
    print ("total time:      " + fast_time + " (min:sec)")
    print("Pace:             " + fast_pace + " (min/mi)")
    print()
    print("slow interval:")
    print ("total time:      " + slow_time + " (min:sec)")
    print("Pace:             "+ slow_pace + " (min/mi)")
    print()
    print("Total Interals:  " + str(intervals))
    print("Total miles:  " + str(total_distance))
    print()
    


def add_seconds(x):
   
    y = (x - x//1)*60//1
    x = x//1

    x =str( int(x)) + ":" + str(int(y))
    return x'''
    



main()
