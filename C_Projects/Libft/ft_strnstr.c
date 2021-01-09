/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strnstr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/18 16:55:41 by blaine            #+#    #+#             */
/*   Updated: 2019/10/25 02:02:40 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strnstr(const char *stack, const char *ndle, size_t l)
{
	int		i;
	int		j;
	int		k;
	int		len;
	char	*str;

	str = (char *)stack;
	k = 0;
	i = 0;
	len = (int)l;
	if (*ndle == '\0')
		return (str);
	while (str[i] && len > 0)
	{
		j = 0;
		while (str[i + j] == ndle[j] && ndle[j] && i + j < (int)l)
			j++;
		if (ndle[j] == '\0')
			return (str + i);
		i++;
		len--;
	}
	return (NULL);
}
